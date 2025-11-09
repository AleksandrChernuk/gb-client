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

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.filter((path) => !excluded.includes(path)).flatMap((href) => getEntries(href));
}

type Href = Parameters<typeof getPathname>[0]['href'];

function getEntries(href: Href) {
  return routing.locales.map((locale) => ({
    url: getUrl(href, locale),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: getPriority(href),
    alternates: {
      languages: Object.fromEntries(routing.locales.map((cur) => [cur, getUrl(href, cur)])),
    },
  }));
}

function getUrl(href: Href, locale: Locale) {
  const pathname = getPathname({ locale, href });
  return host + pathname;
}

function getPriority(href: Href): number {
  // Приводим href к строке для проверки
  const path = typeof href === 'string' ? href : href.pathname;

  // Главная страница - высший приоритет
  if (path === '/') return 1.0;

  // Важные страницы
  if (['/about', '/for-carriers', '/carriers'].includes(path)) return 0.9;

  // Остальные страницы
  return 0.8;
}
