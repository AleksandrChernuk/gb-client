import { MetadataRoute } from 'next';
import { BASE_URL } from '@/shared/configs/constants';
import { getPathname, routing } from '@/shared/i18n/routing';
import { getArticles } from '@/shared/api/articles.actions';
import { getAllFavoriteRoutes } from '@/shared/api/favoriteRoutes.server';
import { getAllCountries } from '@/shared/api/countries.actions';

export const revalidate = 3600;

type Href = Parameters<typeof getPathname>[0]['href'];
type SitemapRoute = {
  slug: string;
  fromLocation?: { slug?: string; country?: { slug?: string } };
  toLocation?: { slug?: string; country?: { slug?: string } };
};

type SitemapLocation = { slug: string; countrySlug: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articlesResponse, routesResponse, countries] = await Promise.all([
    getArticles({ perPage: 100 }).catch(() => ({ data: [] })),
    getAllFavoriteRoutes({ lang: 'uk' }).catch(() => []),
    getAllCountries().catch(() => []),
  ]);

  const posts = articlesResponse.data.map((post) => ({
    slug: post.slug,
    updatedAt: post.updatedAt instanceof Date ? post.updatedAt.toISOString() : new Date(post.updatedAt).toISOString(),
  }));

  // Сторінки авторів беремо зі статей: публічний список авторів закритий (EDITOR),
  // тож індексуємо лише авторів, у яких є опубліковані статті.
  const authorSlugs = [
    ...new Set(
      articlesResponse.data
        .map((post) => post.author?.slug)
        .filter((slug): slug is string => typeof slug === 'string' && slug.length > 0),
    ),
  ];

  const routes = routesResponse.filter((route) => route.slug).map((route) => ({
    slug: route.slug,
    fromLocation: route.fromLocation,
    toLocation: route.toLocation,
  }));
  const locations = getSeoLocationsForSitemap(routes);
  const countrySlugs = getSeoCountrySlugs(locations);

  return [
    ...getStaticPages(),
    ...getBlogPages(posts),
    ...getAuthorPages(authorSlugs),
    ...getRoutePages(routes),
    ...getCountryPages(countries, countrySlugs),
    ...getLocationPages(locations),
  ];
}

// ────────────────────────────────────────────────────────────
// SEO локации: только endpoint-города индексируемых маршрутов.
// Так каждый city/country URL в sitemap бьётся с route-графом и не создаёт orphan pages.
// ────────────────────────────────────────────────────────────
function getSeoLocationsForSitemap(routes: SitemapRoute[]): SitemapLocation[] {
  const byPath = new Map<string, SitemapLocation>();

  const addLocation = (location?: { slug?: string; country?: { slug?: string } }) => {
    if (!location?.slug || !location.country?.slug) return;

    const item = { slug: location.slug, countrySlug: location.country.slug };
    byPath.set(`${item.countrySlug}/${item.slug}`, item);
  };

  for (const route of routes) {
    addLocation(route.fromLocation);
    addLocation(route.toLocation);
  }

  return [...byPath.values()].sort((a, b) => `${a.countrySlug}/${a.slug}`.localeCompare(`${b.countrySlug}/${b.slug}`));
}

function getSeoCountrySlugs(locations: SitemapLocation[]) {
  return new Set(locations.map((location) => location.countrySlug));
}

// ────────────────────────────────────────────────────────────
// Статические страницы
// ────────────────────────────────────────────────────────────
const pages: string[] = [
  '/',
  '/about',
  '/blog',
  '/faq/bronjuvannja-mists',
  '/faq/routes-and-buses',
  '/faq/ticket-refund',
  '/for-carriers',
  '/for-agents',
  '/privacy-policy',
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

function getAuthorPages(authorSlugs: string[]) {
  return authorSlugs.flatMap((slug) =>
    buildEntries(`/authors/${slug}` as Href, {
      priority: 0.6,
      changeFrequency: 'monthly',
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

function getCountryPages(countries: { slug: string }[], countrySlugs: Set<string>) {
  const seoCountries = countrySlugs.size > 0 ? countries.filter((country) => countrySlugs.has(country.slug)) : countries;

  return seoCountries.flatMap((country) =>
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
    const mainUrl = normalizeUrl(BASE_URL + getPathname({ locale, href }));

    const alternateLanguages = Object.fromEntries(
      routing.locales.map((lng) => [lng, normalizeUrl(BASE_URL + getPathname({ locale: lng, href }))]),
    );

    return {
      url: mainUrl,
      priority: seo.priority,
      changeFrequency: seo.changeFrequency,
      ...(seo.lastModified && { lastModified: seo.lastModified }),
      alternates: {
        languages: {
          'x-default': normalizeUrl(BASE_URL + getPathname({ locale: 'uk', href })),
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
  if (['/for-carriers', '/for-agents', '/routes'].includes(href)) return 'weekly';
  if (href.startsWith('/faq')) return 'monthly';
  return 'monthly';
}
