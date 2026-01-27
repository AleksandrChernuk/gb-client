import { MetadataRoute } from 'next';
import { host } from '@/config';
import { getPathname, routing } from '@/shared/i18n/routing';
import { getArticles } from '@/shared/api/articles.actions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await getArticles();

  const posts = response.data.map((post) => ({
    slug: post.slug,
    updatedAt: post.updatedAt instanceof Date ? post.updatedAt.toISOString() : new Date(post.updatedAt).toISOString(),
  }));

  return [...getStaticPages(), ...getBlogPages(posts)];
}

const pages: string[] = [
  '/',
  '/about',
  '/privacy-policy',
  '/all-countries',
  '/oferta',
  '/for-carriers',
  '/for-agents',
  '/faq',
  '/carriers',
  '/agents',
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

type Href = Parameters<typeof getPathname>[0]['href'];

// ✅ Функция нормализации URL с trailing slash
function normalizeUrl(url: string): string {
  // Если URL заканчивается на "/" - оставляем как есть
  if (url.endsWith('/')) return url;

  // Если URL содержит расширение файла (.xml, .pdf и т.д.) - не добавляем "/"
  if (url.match(/\.[a-z]+$/i)) return url;

  // Во всех остальных случаях добавляем "/"
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
    // ✅ Нормализуем основной URL
    const mainUrl = normalizeUrl(host + getPathname({ locale, href }));

    // ✅ Нормализуем alternate URLs
    const alternateLanguages = Object.fromEntries(
      routing.locales.map((lng) => [lng, normalizeUrl(host + getPathname({ locale: lng, href }))]),
    );

    return {
      url: mainUrl,
      priority: seo.priority,
      changeFrequency: seo.changeFrequency,
      ...(seo.lastModified && { lastModified: seo.lastModified }),
      alternates: {
        languages: alternateLanguages,
      },
    };
  });
}

function getPriority(href: string) {
  if (href === '/') return 1.0;
  if (['/for-carriers', '/carriers'].includes(href)) return 0.9;
  return 0.6;
}

function getChangeFreq(href: string): MetadataRoute.Sitemap[number]['changeFrequency'] {
  if (href === '/') return 'daily';
  if (['/for-carriers', '/carriers'].includes(href)) return 'weekly';
  return 'monthly';
}
