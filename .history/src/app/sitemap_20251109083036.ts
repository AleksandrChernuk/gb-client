import { MetadataRoute } from 'next';
import { Locale } from 'next-intl';
import { host } from '@/config';
import { getPathname, routing } from '@/shared/i18n/routing';

const excluded: string[] = [
  '/buses',
  '/checkout',
  '/signin',
  '/signup',
  '/success',
  '/profile',
  '/orders',
  '/forgot',
  '/error',
  '/update-password',
  '/verify-2FA',
  '/admin',
  '/dashboard',
  '/api',
  '/_next',
];

export default function sitemap(): MetadataRoute.Sitemap {
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
    '/blog',
    '/agents',
  ];

  return pages.filter((path) => !excluded.includes(path)).flatMap((href) => getEntries(href));
}

type Href = Parameters<typeof getPathname>[0]['href'];

function getEntries(href: Href) {
  return routing.locales.map((locale) => ({
    url: getUrl(href, locale),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: href === '/' ? 1.0 : 0.8,
    alternates: {
      languages: Object.fromEntries(routing.locales.map((cur) => [cur, getUrl(href, cur)])),
    },
  }));
}

function getUrl(href: Href, locale: Locale) {
  const pathname = getPathname({ locale, href });
  return host + pathname;
}
