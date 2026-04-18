import { MetadataRoute } from 'next';
import { host } from '@/config';
import { getPathname, routing } from '@/shared/i18n/routing';
import { getArticles } from '@/shared/api/articles.actions';
import { getFavoriteRoutes } from '@/shared/api/favoriteRoutes.server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articlesResponse, routesResponse] = await Promise.all([
    getArticles(),
    getFavoriteRoutes({ page: 1, perPage: 1000, lang: 'uk' }).catch(() => ({ data: [] })),
  ]);

  const posts = articlesResponse.data.map((post) => ({
    slug: post.slug,
    updatedAt: post.updatedAt instanceof Date ? post.updatedAt.toISOString() : new Date(post.updatedAt).toISOString(),
  }));

  const routes = routesResponse.data.map((route) => ({ slug: route.slug }));

  return [...getStaticPages(), ...getBlogPages(posts), ...getRoutePages(routes)];
}

const pages: string[] = [
  '/',
  '/about',
  '/blog',
  '/faq',
  '/faq/bronjuvannja-mists',
  '/faq/routes-and-buses',
  '/faq/search',
  '/faq/ticket-refund',
  '/routes',
];

function getStaticPages() {
  return pages.flatMap((href) =>
    buildEntries(href, {
      priority: getPriority(href),
      changeFrequency: getChangeFreq(href),
    }),
  );
}

function getBlogPages(posts: { slug: string; updatedAt: string }[]) {
  return posts.flatMap((post) =>
    buildEntries(`/blog/${post.slug}`, {
      priority: 0.8,
      changeFrequency: 'weekly',
      lastModified: post.updatedAt,
    }),
  );
}

// ✅ Динамічні сторінки маршрутів
function getRoutePages(routes: { slug: string }[]) {
  return routes.flatMap((route) =>
    buildEntries(`/routes/${route.slug}` as Parameters<typeof getPathname>[0]['href'], {
      priority: 0.8,
      changeFrequency: 'weekly',
    }),
  );
}

type Href = Parameters<typeof getPathname>[0]['href'];

// ✅ Функция нормализации URL с trailing slash
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
  if (href === '/for-carriers') return 0.9;
  if (['/routes', '/blog'].includes(href)) return 0.8;
  if (href.startsWith('/faq/')) return 0.7;
  return 0.6;
}

function getChangeFreq(href: string): MetadataRoute.Sitemap[number]['changeFrequency'] {
  if (href === '/') return 'daily';
  if (['/for-carriers', '/routes'].includes(href)) return 'weekly';
  if (href.startsWith('/faq')) return 'monthly';
  return 'monthly';
}
