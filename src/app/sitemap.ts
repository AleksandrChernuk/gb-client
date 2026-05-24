import { MetadataRoute } from 'next';
import { host } from '@/config';
import { getPathname, routing } from '@/shared/i18n/routing';
import { getArticles } from '@/shared/api/articles.actions';
import { getFavoriteRoutes } from '@/shared/api/favoriteRoutes.server';
import { getAllCountries } from '@/shared/api/countries.actions';
import { getLocations } from '@/shared/api/location.actions';

export const revalidate = 3600;

type Href = Parameters<typeof getPathname>[0]['href'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articlesResponse, routesResponse, countries, locations] = await Promise.all([
    getArticles().catch(() => ({ data: [] })),
    getFavoriteRoutes({ page: 1, perPage: 1000, lang: 'uk' }).catch(() => ({ data: [] })),
    getAllCountries().catch(() => []),
    getAllLocationsForSitemap().catch(() => []),
  ]);

  const posts = articlesResponse.data.map((post) => ({
    slug: post.slug,
    updatedAt: post.updatedAt instanceof Date ? post.updatedAt.toISOString() : new Date(post.updatedAt).toISOString(),
  }));

  const routes = routesResponse.data.map((route) => ({ slug: route.slug }));

  return [
    ...getStaticPages(),
    ...getBlogPages(posts),
    ...getRoutePages(routes),
    ...getCountryPages(countries),
    ...getLocationPages(locations),
  ];
}

// ────────────────────────────────────────────────────────────
// Все локации со всеми страницами пагинации
// ────────────────────────────────────────────────────────────
async function getAllLocationsForSitemap() {
  const all: { slug: string; countrySlug: string }[] = [];
  let page = 1;
  const perPage = 500;

  while (true) {
    const res = await getLocations({ page, perPage });

    for (const loc of res.data) {
      if (loc.slug && loc.country?.slug) {
        all.push({ slug: loc.slug, countrySlug: loc.country.slug });
      }
    }

    if (page >= res.totalPages) break;
    page++;
  }

  return all;
}

// ────────────────────────────────────────────────────────────
// Статические страницы
// ────────────────────────────────────────────────────────────
const pages: string[] = [
  '/',
  '/about',
  '/blog',
  '/faq',
  '/faq/bronjuvannja-mists',
  '/faq/routes-and-buses',
  '/faq/ticket-refund',
  '/all-countries',
  '/routes',
];

function getStaticPages() {
  return pages.flatMap((href) =>
    buildEntries(href as Href, {
      priority: getPriority(href),
      changeFrequency: getChangeFreq(href),
    }),
  );
}

function getBlogPages(posts: { slug: string; updatedAt: string }[]) {
  return posts.flatMap((post) =>
    buildEntries(`/blog/${post.slug}` as Href, {
      priority: 0.8,
      changeFrequency: 'weekly',
      lastModified: post.updatedAt,
    }),
  );
}

function getRoutePages(routes: { slug: string }[]) {
  return routes.flatMap((route) =>
    buildEntries(`/routes/${route.slug}` as Href, {
      priority: 0.8,
      changeFrequency: 'weekly',
    }),
  );
}

function getCountryPages(countries: { slug: string }[]) {
  return countries.flatMap((country) =>
    buildEntries(`/all-countries/${country.slug}` as Href, {
      priority: 0.8,
      changeFrequency: 'weekly',
    }),
  );
}

function getLocationPages(locations: { slug: string; countrySlug: string }[]) {
  return locations.flatMap((location) =>
    buildEntries(`/all-countries/${location.countrySlug}/${location.slug}` as Href, {
      priority: 0.7,
      changeFrequency: 'weekly',
    }),
  );
}

// ────────────────────────────────────────────────────────────
// Хелперы
// ────────────────────────────────────────────────────────────
function normalizeUrl(url: string): string {
  if (url.endsWith('/')) return url;
  if (url.match(/\.[a-z]+$/i)) return url;
  return url + '/';
}

function buildEntries(
  href: Href,
  seo: {
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    lastModified?: string;
  },
) {
  return routing.locales.map((locale) => {
    const mainUrl = normalizeUrl(host + getPathname({ locale, href }));

    const alternateLanguages = Object.fromEntries(
      routing.locales.map((lng) => [lng, normalizeUrl(host + getPathname({ locale: lng, href }))]),
    );

    return {
      url: mainUrl,
      priority: seo.priority,
      changeFrequency: seo.changeFrequency,
      ...(seo.lastModified && { lastModified: seo.lastModified }),
      alternates: {
        languages: {
          'x-default': normalizeUrl(host + getPathname({ locale: 'uk', href })),
          ...alternateLanguages,
        },
      },
    };
  });
}

function getPriority(href: string) {
  if (href === '/') return 1.0;
  if (['/routes', '/blog', '/all-countries'].includes(href)) return 0.9;
  if (href.startsWith('/faq/')) return 0.7;
  return 0.6;
}

function getChangeFreq(href: string): MetadataRoute.Sitemap[number]['changeFrequency'] {
  if (href === '/') return 'daily';
  if (['/for-carriers', '/routes'].includes(href)) return 'weekly';
  if (href.startsWith('/faq')) return 'monthly';
  return 'monthly';
}
