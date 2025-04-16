import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'uk', 'ru'],
  defaultLocale: 'uk',
  localeCookie: {
    maxAge: 60 * 60 * 24 * 365,
    secure: true,
    sameSite: 'lax',
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
