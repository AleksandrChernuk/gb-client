import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import robots from '@/app/robots';
import sitemap from '@/app/sitemap';
import { getArticles } from '@/shared/api/articles.actions';
import { getAllCountries } from '@/shared/api/countries.actions';
import { getAllFavoriteRoutes } from '@/shared/api/favoriteRoutes.server';
import {
  getCleanSeoQueryRedirectPath,
  getQueryRobotsHeader,
  getRouteRobotsForSearchParams,
  shouldNoindexQueryUrl,
} from '@/shared/seo/route-query-indexing';
import { getInternalSeoHref } from '@/shared/seo/internal-links';
import { BreadcrumbSimple } from '@/shared/ui/BreadcrumbSimple';

jest.mock('@/shared/api/articles.actions', () => ({
  getArticles: jest.fn(),
}));

jest.mock('@/shared/api/favoriteRoutes.server', () => ({
  getAllFavoriteRoutes: jest.fn(),
}));

jest.mock('@/shared/api/countries.actions', () => ({
  getAllCountries: jest.fn(),
}));

jest.mock('@/shared/i18n/routing', () => ({
  routing: {
    locales: ['uk', 'ru', 'en'],
  },
  getPathname: ({ locale, href }: { locale: string; href: string }) => {
    const normalizedHref = href === '/' ? '/' : href.endsWith('/') ? href : `${href}/`;
    return `/${locale}${normalizedHref}`;
  },
}));

jest.mock('next/link', () => {
  const React = require('react');

  return {
    __esModule: true,
    default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) =>
      React.createElement('a', { href, ...props }, children),
  };
});

const mockedGetArticles = jest.mocked(getArticles);
const mockedGetAllFavoriteRoutes = jest.mocked(getAllFavoriteRoutes);
const mockedGetAllCountries = jest.mocked(getAllCountries);

function readProjectFile(filePath: string) {
  return fs.readFileSync(path.join(process.cwd(), filePath), 'utf8');
}

describe('SEO safety invariants', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedGetArticles.mockResolvedValue({
      data: [{ slug: 'avtovokzaly-pragy', updatedAt: '2026-01-15T12:00:00.000Z' }],
      totalArticles: 1,
      page: 1,
      perPage: 20,
      totalPages: 1,
    } as unknown as Awaited<ReturnType<typeof getArticles>>);

    mockedGetAllFavoriteRoutes.mockResolvedValue([
      {
        slug: 'kyiv-prague',
        fromLocation: { slug: 'kyiv', country: { slug: 'ukraine' } },
        toLocation: { slug: 'prague', country: { slug: 'czech-republic' } },
      },
      {
        slug: 'berlin-zaporizhzhia',
        fromLocation: { slug: 'berlin', country: { slug: 'germany' } },
        toLocation: { slug: 'zaporizhzhia', country: { slug: 'ukraine' } },
      },
      { slug: '' },
    ] as Awaited<ReturnType<typeof getAllFavoriteRoutes>>);

    mockedGetAllCountries.mockResolvedValue([
      { slug: 'ukraine' },
      { slug: 'czech-republic' },
      { slug: 'germany' },
      { slug: 'france' },
    ] as Awaited<ReturnType<typeof getAllCountries>>);

  });

  it('keeps llms.txt curated for public canonical pages only', () => {
    const text = readProjectFile('public/llms.txt');
    const lines = text.split(/\r?\n/);
    const firstNonEmptyLine = lines.find((line) => line.trim().length > 0);
    const h1Lines = lines.filter((line) => /^# /.test(line));
    const markdownLinks = [...text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((match) => match[1]);
    const bannedPatterns = [
      /\/questions\//,
      /\/countries\//,
      /\/profile\//,
      /\/checkout\//,
      /\/payment-result\//,
      /\/signin\//,
      /\/signup\//,
      /\/buses\//,
      /\?/,
    ];

    expect(Buffer.byteLength(text, 'utf8')).toBeLessThanOrEqual(8192);
    expect(firstNonEmptyLine).toBe('# GreenBus');
    expect(h1Lines).toHaveLength(1);
    expect(lines.filter((line) => /^#{3,6} /.test(line))).toHaveLength(0);
    expect(markdownLinks.length).toBeGreaterThan(0);

    for (const url of markdownLinks) {
      expect(url).toMatch(/^https:\/\/greenbus\.com\.ua\//);
      expect(bannedPatterns.some((pattern) => pattern.test(url))).toBe(false);

      if (url !== 'https://greenbus.com.ua/sitemap.xml') {
        expect(url.endsWith('/')).toBe(true);
      }
    }

    for (const line of lines.filter((line) => /^- \[[^\]]+\]\(https:\/\/greenbus\.com\.ua[^)]+\)/.test(line))) {
      expect(line).toMatch(/\):\s+\S/);
    }
  });

  it('keeps robots pointing to the production sitemap without globally blocking query URLs', () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    const allow = rules.flatMap((rule) => rule.allow ?? []);
    const disallow = rules.flatMap((rule) => rule.disallow ?? []);

    expect(result.sitemap).toBe('https://greenbus.com.ua/sitemap.xml');
    expect(allow).toContain('/');
    expect(allow).toContain('/_next/static/');
    expect(allow).toContain('/_next/image');
    expect(disallow).not.toContain('/*?*');
    expect(disallow).toContain('/_next/');
    expect(disallow).toContain('/*/profile');
    expect(disallow).toContain('/*/checkout');
    expect(disallow).not.toContain('/llms.txt');
  });

  it('keeps PWA manifest and touch icons wired to real public assets', () => {
    const appManifest = readProjectFile('src/app/manifest.ts');
    const localeLayout = readProjectFile('src/app/[lng]/layout.tsx');

    expect(fs.existsSync(path.join(process.cwd(), 'public/manifest.ts'))).toBe(false);
    expect(appManifest).toContain("src: '/icon-192x192.png'");
    expect(appManifest).toContain("src: '/icon-512x512.png'");
    expect(localeLayout).toContain("url: '/icon-192x192.png'");
    expect(localeLayout).not.toContain('/apple-touch-icon-');
  });

  it('keeps query URLs out of the index without blocking crawlers from seeing noindex', () => {
    const busesPage = readProjectFile('src/app/[lng]/(root)/buses/page.tsx');
    const cleanRouteRobots = getRouteRobotsForSearchParams({});
    const routeQueryRobots = getRouteRobotsForSearchParams({ from: '126', to: '16' });

    expect(busesPage).toContain('generatePrivatePageMetadata');
    expect(busesPage).not.toContain('generatePublicPageMetadata');
    expect(cleanRouteRobots).toBeUndefined();
    expect(routeQueryRobots).toMatchObject({
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    });
    expect(shouldNoindexQueryUrl('/uk/routes/kryvyi-rih-prague/', '')).toBe(false);
    expect(shouldNoindexQueryUrl('/uk/routes/kryvyi-rih-prague/', '?from=126&to=16')).toBe(true);
    expect(shouldNoindexQueryUrl('/uk/buses/', '?from=11&to=8&date=2025-11-21')).toBe(true);
    expect(shouldNoindexQueryUrl('/uk/blog/', '?page=2')).toBe(true);
    expect(shouldNoindexQueryUrl('/uk/faq/search/', '?q=bus+schedule')).toBe(true);
    expect(getQueryRobotsHeader('/uk/routes/kryvyi-rih-prague/', '?from=126&to=16')).toBe('noindex, follow');
    expect(getQueryRobotsHeader('/uk/buses/', '?from=11&to=8&date=2025-11-21')).toBe('noindex, nofollow');
    expect(getQueryRobotsHeader('/uk/blog/', '?page=2')).toBe('noindex, follow');
    expect(getQueryRobotsHeader('/uk/faq/search/', '?q=bus+schedule')).toBe('noindex, follow');
    expect(getQueryRobotsHeader('/uk/routes/kryvyi-rih-prague/', '')).toBeUndefined();
    expect(getCleanSeoQueryRedirectPath('/uk/all-countries/ukraine/poltava', '?to=36')).toBe(
      '/uk/all-countries/ukraine/poltava/',
    );
    expect(getCleanSeoQueryRedirectPath('/uk/all-countries/ukraine/', '?utm_source=google')).toBe(
      '/uk/all-countries/ukraine/',
    );
    expect(getCleanSeoQueryRedirectPath('/uk/faq/routes-and-buses', '?q=available-flights-schedules')).toBe(
      '/uk/faq/routes-and-buses/',
    );
    expect(getCleanSeoQueryRedirectPath('/ru/faq/routes-and-buses/', '?q=available-flights-schedules')).toBe(
      '/ru/faq/routes-and-buses/',
    );
    expect(getCleanSeoQueryRedirectPath('/uk/routes/kryvyi-rih-prague/', '?from=126&to=16')).toBeUndefined();
    expect(getCleanSeoQueryRedirectPath('/uk/buses/', '?from=11&to=8&date=2025-11-21')).toBeUndefined();
  });

  it('normalizes CMS internal SEO links to clean trailing-slash URLs', () => {
    expect(getInternalSeoHref('https://greenbus.com.ua/ru/blog/bus-travel-ukraine-germany-guide')).toBe(
      '/blog/bus-travel-ukraine-germany-guide/',
    );
    expect(
      getInternalSeoHref('https://www.greenbus.com.ua/uk/faq/routes-and-buses?q=available-flights-schedules'),
    ).toBe('/faq/routes-and-buses/');
    expect(getInternalSeoHref('/uk/all-countries/ukraine?utm_source=google')).toBe('/all-countries/ukraine/');
    expect(getInternalSeoHref('/uk/routes/kryvyi-rih-prague?from=126&to=16')).toBe(
      '/routes/kryvyi-rih-prague/?from=126&to=16',
    );
    expect(getInternalSeoHref('/llms.txt')).toBe('/llms.txt');
    expect(getInternalSeoHref('https://example.com/uk/routes/kryvyi-rih-prague')).toBeUndefined();
    expect(getInternalSeoHref('#section')).toBeUndefined();
  });

  it('generates a production sitemap with indexable localized URLs only', async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain('https://greenbus.com.ua/uk/');
    expect(urls).toContain('https://greenbus.com.ua/uk/routes/');
    expect(urls).toContain('https://greenbus.com.ua/uk/routes/kyiv-prague/');
    expect(urls).toContain('https://greenbus.com.ua/uk/routes/berlin-zaporizhzhia/');
    expect(urls).toContain('https://greenbus.com.ua/uk/all-countries/ukraine/kyiv/');
    expect(urls).toContain('https://greenbus.com.ua/uk/all-countries/ukraine/zaporizhzhia/');
    expect(urls).toContain('https://greenbus.com.ua/uk/all-countries/czech-republic/prague/');
    expect(urls).toContain('https://greenbus.com.ua/uk/all-countries/germany/berlin/');
    expect(urls).toContain('https://greenbus.com.ua/uk/faq/bronjuvannja-mists/');
    expect(urls).toContain('https://greenbus.com.ua/uk/for-carriers/');
    expect(urls).toContain('https://greenbus.com.ua/uk/for-agents/');
    expect(urls).toContain('https://greenbus.com.ua/uk/privacy-policy/');

    expect(urls.some((url) => url.includes('localhost') || url.includes('vercel.app'))).toBe(false);
    expect(urls.some((url) => url.includes('?'))).toBe(false);
    expect(urls.some((url) => url.includes('/routes/undefined/') || url.includes('/routes//'))).toBe(false);
    expect(urls.some((url) => /\/(profile|checkout|payment-result|buses)\//.test(url))).toBe(false);
    expect(urls).not.toContain('https://greenbus.com.ua/uk/faq/');
    expect(urls).not.toContain('https://greenbus.com.ua/uk/oferta/');
    expect(urls).not.toContain('https://greenbus.com.ua/uk/all-countries/france/');
    expect(urls).not.toContain('https://greenbus.com.ua/uk/all-countries/ukraine/lviv/');
    expect(urls.every((url) => url.endsWith('/'))).toBe(true);

    const routeEntry = entries.find((entry) => entry.url === 'https://greenbus.com.ua/uk/routes/kyiv-prague/');
    expect(routeEntry?.alternates?.languages).toMatchObject({
      'x-default': 'https://greenbus.com.ua/uk/routes/kyiv-prague/',
      uk: 'https://greenbus.com.ua/uk/routes/kyiv-prague/',
      ru: 'https://greenbus.com.ua/ru/routes/kyiv-prague/',
      en: 'https://greenbus.com.ua/en/routes/kyiv-prague/',
    });
  });

  it('renders locale-aware breadcrumb links and omits the current page item URL in JSON-LD', () => {
    const html = renderToStaticMarkup(
      <BreadcrumbSimple
        locale="uk"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Routes', href: '/routes' },
          { label: 'Kyiv Prague', href: '/routes/kyiv-prague/' },
        ]}
      />,
    );
    const jsonLd = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)?.[1] ?? '{}');

    expect(html).toContain('href="/uk/"');
    expect(html).toContain('href="/uk/routes/"');
    expect(html).not.toContain('href="/routes"');
    expect(jsonLd.itemListElement[0].item).toBe('https://greenbus.com.ua/uk/');
    expect(jsonLd.itemListElement[1].item).toBe('https://greenbus.com.ua/uk/routes/');
    expect(jsonLd.itemListElement[2]).not.toHaveProperty('item');
  });

  it('keeps SEO route cards away from blocked query search URLs', () => {
    const seoCardFiles = [
      'src/app/[lng]/layout.tsx',
      'src/app/[lng]/(root)/buses/page.tsx',
      'src/views/home-page/PopularRoutesSection/PopularRoutes.tsx',
      'src/views/favorite-route/RoutesList/index.tsx',
      'src/app/[lng]/(root)/all-countries/[countrySlug]/[locationSlug]/page.tsx',
      'src/views/home-page/QuestionsSection/Questions.tsx',
    ];

    for (const filePath of seoCardFiles) {
      const content = readProjectFile(filePath);

      expect(content).not.toContain('/buses/?from=');
      expect(content).not.toContain('?q=');
    }

    for (const filePath of seoCardFiles.slice(2, 5)) {
      expect(readProjectFile(filePath)).toContain('/routes/${route.slug}/');
    }
  });

  it('prevents stale route slugs from becoming soft 404 SEO pages', () => {
    const routePage = readProjectFile('src/app/[lng]/(root)/routes/[slug]/page.tsx');
    const favoriteRoutesApi = readProjectFile('src/shared/api/favoriteRoutes.server.ts');

    expect(routePage).toContain('getAllFavoriteRoutes');
    expect(routePage).toContain('permanentRedirect(`/${lng}/routes/`)');
    expect(routePage).toContain('isFavoriteRouteNotFoundError');
    expect(favoriteRoutesApi).toContain('FavoriteRouteNotFoundError');
    expect(favoriteRoutesApi).toContain('response.status === 404');
  });

  it('links route detail pages back to endpoint city pages for crawl discovery', () => {
    const routePage = readProjectFile('src/app/[lng]/(root)/routes/[slug]/page.tsx');
    const routeContent = readProjectFile('src/views/favorite-route-slug/RouteContent/RouteContent.tsx');

    expect(routePage).toContain('/all-countries/${route.fromLocation.country.slug}/${route.fromLocation.slug}/');
    expect(routePage).toContain('/all-countries/${route.toLocation.country.slug}/${route.toLocation.slug}/');
    expect(routePage).toContain('endpointLinks={endpointLinks}');
    expect(routeContent).toContain('endpointLinks');
  });

  it('prevents mismatched country/city URLs from becoming indexable duplicates', () => {
    const locationPage = readProjectFile(
      'src/app/[lng]/(root)/all-countries/[countrySlug]/[locationSlug]/page.tsx',
    );

    expect(locationPage).toContain('countrySlug');
    expect(locationPage).toContain('data.country.slug !== countrySlug');
    expect(locationPage).toContain('permanentRedirect(`/${lng}/all-countries/${data.country.slug}/${data.slug}/`)');
  });

  it('keeps city pages linkable to routes even when the location API omits endpoint objects', () => {
    const locationPage = readProjectFile(
      'src/app/[lng]/(root)/all-countries/[countrySlug]/[locationSlug]/page.tsx',
    );

    expect(locationPage).toContain('.filter((route) => !!route.slug)');
    expect(locationPage).toContain('getRouteEndpointNames(route.slug, details.locationName)');
    expect(locationPage).toContain('fromDetails?.locationName ?? fallbackNames.fromName');
    expect(locationPage).toContain('toDetails?.locationName ?? fallbackNames.toName');
    expect(locationPage).toContain('/routes/${route.slug}/');
  });

  it('uses a real content threshold before indexing city pages without route links', () => {
    const locationPage = readProjectFile(
      'src/app/[lng]/(root)/all-countries/[countrySlug]/[locationSlug]/page.tsx',
    );

    expect(locationPage).toContain('MIN_INDEXABLE_CITY_DESCRIPTION_WORDS = 500');
    expect(locationPage).toContain('getDescriptionWordCount(localizedDescription)');
    expect(locationPage).toContain('const hasRoutes = (data.favoriteRoutesFrom ?? []).some((r) => !!r.slug)');
    expect(locationPage).toContain('const isThin = !hasRoutes && !hasEnoughDescription');
  });

  it('preserves faq/search query params and does not strip them via SEO redirect', () => {
    // Regression: /faq/search?q=... was being 308-redirected to /faq/search/ (losing ?q=)
    expect(getCleanSeoQueryRedirectPath('/uk/faq/search', '?q=bus+schedule')).toBeUndefined();
    expect(getCleanSeoQueryRedirectPath('/ru/faq/search', '?q=test')).toBeUndefined();
    expect(getCleanSeoQueryRedirectPath('/en/faq/search/', '?q=abc')).toBeUndefined();

    // Other FAQ slugs still get cleaned
    expect(getCleanSeoQueryRedirectPath('/uk/faq/bronjuvannja-mists', '?q=something')).toBe(
      '/uk/faq/bronjuvannja-mists/',
    );
    expect(getCleanSeoQueryRedirectPath('/uk/faq/routes-and-buses', '?anchor=foo')).toBe('/uk/faq/routes-and-buses/');
    expect(getCleanSeoQueryRedirectPath('/uk/faq/ticket-refund/', '?ref=email')).toBe('/uk/faq/ticket-refund/');
  });

  it('deduplicates city pages in sitemap when a city appears in multiple routes', async () => {
    mockedGetAllFavoriteRoutes.mockResolvedValueOnce([
      {
        slug: 'kyiv-prague',
        fromLocation: { slug: 'kyiv', country: { slug: 'ukraine' } },
        toLocation: { slug: 'prague', country: { slug: 'czech-republic' } },
      },
      {
        slug: 'kyiv-berlin',
        fromLocation: { slug: 'kyiv', country: { slug: 'ukraine' } },
        toLocation: { slug: 'berlin', country: { slug: 'germany' } },
      },
    ] as Awaited<ReturnType<typeof getAllFavoriteRoutes>>);

    const entries = await sitemap();
    const kyivUrls = entries.filter((e) => e.url.includes('/all-countries/ukraine/kyiv/'));

    // 3 locales (uk, ru, en) — not 6 (kyiv would be doubled without deduplication)
    expect(kyivUrls).toHaveLength(3);
  });

  it('keeps route, city, and country sitemap entries in the same route endpoint graph', async () => {
    mockedGetAllFavoriteRoutes.mockResolvedValueOnce([
      {
        slug: 'kyiv-prague',
        fromLocation: { slug: 'kyiv', country: { slug: 'ukraine' } },
        toLocation: { slug: 'prague', country: { slug: 'czech-republic' } },
      },
      {
        slug: 'berlin-zaporizhzhia',
        fromLocation: { slug: 'berlin', country: { slug: 'germany' } },
        toLocation: { slug: 'zaporizhzhia', country: { slug: 'ukraine' } },
      },
    ] as Awaited<ReturnType<typeof getAllFavoriteRoutes>>);

    const urls = (await sitemap()).map((entry) => entry.url);

    expect(urls).toContain('https://greenbus.com.ua/uk/routes/kyiv-prague/');
    expect(urls).toContain('https://greenbus.com.ua/uk/routes/berlin-zaporizhzhia/');
    expect(urls).toContain('https://greenbus.com.ua/uk/all-countries/ukraine/kyiv/');
    expect(urls).toContain('https://greenbus.com.ua/uk/all-countries/czech-republic/prague/');
    expect(urls).toContain('https://greenbus.com.ua/uk/all-countries/germany/berlin/');
    expect(urls).toContain('https://greenbus.com.ua/uk/all-countries/ukraine/zaporizhzhia/');
    expect(urls).toContain('https://greenbus.com.ua/uk/all-countries/czech-republic/');
    expect(urls).toContain('https://greenbus.com.ua/uk/all-countries/germany/');
    expect(urls).not.toContain('https://greenbus.com.ua/uk/all-countries/france/');
    expect(urls).not.toContain('https://greenbus.com.ua/uk/all-countries/ukraine/lviv/');
  });

  it('strips existing locale prefix in BreadcrumbSimple hrefs before re-applying correct locale', () => {
    const html = renderToStaticMarkup(
      <BreadcrumbSimple
        locale="ru"
        items={[
          { label: 'Головна', href: '/' },
          { label: 'Країни', href: '/uk/all-countries/' },
          { label: 'Україна', href: '/uk/all-countries/ukraine/' },
        ]}
      />,
    );
    const jsonLd = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)?.[1] ?? '{}');

    expect(html).toContain('href="/ru/"');
    expect(html).toContain('href="/ru/all-countries/"');
    expect(html).not.toContain('href="/ru/uk/all-countries/"');
    expect(jsonLd.itemListElement[0].item).toBe('https://greenbus.com.ua/ru/');
    expect(jsonLd.itemListElement[1].item).toBe('https://greenbus.com.ua/ru/all-countries/');
    // Last item has no `item` per BreadcrumbList spec
    expect(jsonLd.itemListElement[2]).not.toHaveProperty('item');
  });
});
