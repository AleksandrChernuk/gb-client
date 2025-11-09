import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'ru', 'uk'],
  defaultLocale: 'uk',
  localeCookie: {
    maxAge: 60 * 60 * 24 * 365,
    secure: true,
    sameSite: 'lax',
  },
  localePrefix: {
    mode: 'as-needed', // ✅ Изменено с 'always' на 'as-needed'
    prefixes: {
      // uk не указываем - он будет без префикса (по умолчанию)
      ru: '/ru',
      en: '/en',
    },
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
