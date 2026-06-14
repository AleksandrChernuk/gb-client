import { getCleanSeoQueryRedirectPath } from './route-query-indexing';

const OWN_HOST = 'greenbus.com.ua';
const LOCALES = ['uk', 'ru', 'en'];

function stripLocalePrefix(pathname: string) {
  const parts = pathname.split('/').filter(Boolean);

  if (LOCALES.includes(parts[0])) {
    return `/${parts.slice(1).join('/')}`;
  }

  return pathname || '/';
}

function hasFileExtension(pathname: string) {
  return /\/[^/]+\.[^/]+$/.test(pathname);
}

function withTrailingSlash(pathname: string) {
  if (pathname === '/' || pathname.endsWith('/') || hasFileExtension(pathname)) {
    return pathname;
  }

  return `${pathname}/`;
}

function cleanSearchForSeoPath(pathname: string, search: string) {
  if (!search) return { pathname, search };

  const localizedPathname =
    pathname.startsWith('/uk/') || pathname.startsWith('/ru/') || pathname.startsWith('/en/')
      ? pathname
      : `/uk${pathname}`;

  const redirectPath = getCleanSeoQueryRedirectPath(localizedPathname, search);

  if (!redirectPath) {
    return { pathname, search };
  }

  return {
    pathname: stripLocalePrefix(redirectPath),
    search: '',
  };
}

export function getInternalSeoHref(href: string): string | undefined {
  const value = href.trim();

  if (!value || value.startsWith('#') || /^(mailto|tel|sms):/i.test(value)) {
    return undefined;
  }

  if (/^\/\//.test(value)) {
    return undefined;
  }

  const isAbsolute = /^https?:\/\//i.test(value);

  try {
    const url = new URL(value, `https://${OWN_HOST}`);

    if (isAbsolute && url.hostname !== OWN_HOST && url.hostname !== `www.${OWN_HOST}`) {
      return undefined;
    }

    const clean = cleanSearchForSeoPath(url.pathname, url.search);
    const pathname = withTrailingSlash(stripLocalePrefix(clean.pathname));

    return `${pathname}${clean.search}${url.hash}`;
  } catch {
    return undefined;
  }
}
