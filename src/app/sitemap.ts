import { MetadataRoute } from 'next';
import { host } from '@/config';
import { getPathname, routing } from '@/shared/i18n/routing';
import { getArticles } from '@/shared/api/articles.actions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await getArticles();

  const posts: { slug: string; updatedAt: string }[] = Array.isArray(response) ? response : [];

  return [...getPages(), ...getBlog(posts)];
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

function getPages() {
  return pages.flatMap((href) =>
    buildEntries(href, {
      priority: getPriority(href),
      changeFrequency: getChangeFreq(href),
    }),
  );
}

function getBlog(posts: { slug: string; updatedAt: string }[]) {
  return posts.flatMap((post) =>
    buildEntries(`/blog/${post.slug}`, {
      priority: 0.8,
      changeFrequency: 'weekly',
      lastModified: post.updatedAt,
    }),
  );
}

type Href = Parameters<typeof getPathname>[0]['href'];

function buildEntries(
  href: Href,
  seo: {
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    lastModified?: string;
  },
) {
  return routing.locales.map((locale) => ({
    url: host + getPathname({ locale, href }),
    priority: seo.priority,
    changeFrequency: seo.changeFrequency,
    ...(seo.lastModified && { lastModified: seo.lastModified }),
    alternates: {
      languages: Object.fromEntries(routing.locales.map((lng) => [lng, host + getPathname({ locale: lng, href })])),
    },
  }));
}

function getPriority(href: string) {
  if (href === '/') return 1.0;
  if (['/for-carriers', '/carriers'].includes(href)) return 0.9;
  return 0.6;
}

function getChangeFreq(href: string) {
  if (href === '/') return 'daily';
  if (['/for-carriers', '/carriers'].includes(href)) return 'weekly';
  return 'monthly';
}
