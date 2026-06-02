import type { Metadata } from 'next';

type SearchParams = Record<string, string | string[] | undefined>;

export const QUERY_NOINDEX_HEADER = 'noindex, follow';
export const PRIVATE_QUERY_NOINDEX_HEADER = 'noindex, nofollow';

export const ROUTE_QUERY_ROBOTS: NonNullable<Metadata['robots']> = {
  index: false,
  follow: true,
  googleBot: {
    index: false,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
};

export function getRouteRobotsForSearchParams(searchParams: SearchParams): Metadata['robots'] | undefined {
  return Object.keys(searchParams).length > 0 ? ROUTE_QUERY_ROBOTS : undefined;
}

export function shouldNoindexQueryUrl(pathname: string, search: string): boolean {
  return getQueryRobotsHeader(pathname, search) !== undefined;
}

export function getQueryRobotsHeader(pathname: string, search: string): string | undefined {
  if (!search) return undefined;

  if (/^\/(uk|ru|en)\/routes\/[^/]+\/?$/.test(pathname)) {
    return QUERY_NOINDEX_HEADER;
  }

  if (/^\/(uk|ru|en)\/buses\/?$/.test(pathname)) {
    return PRIVATE_QUERY_NOINDEX_HEADER;
  }

  return undefined;
}

export function getCleanSeoQueryRedirectPath(pathname: string, search: string): string | undefined {
  if (!search) return undefined;

  if (isCleanableSeoQueryPath(pathname)) {
    return pathname.endsWith('/') ? pathname : `${pathname}/`;
  }

  return undefined;
}

function isCleanableSeoQueryPath(pathname: string): boolean {
  if (/^\/(uk|ru|en)\/faq\/search\/?$/.test(pathname)) return false;

  return (
    /^\/(uk|ru|en)\/faq\/[^/]+\/?$/.test(pathname) ||
    /^\/(uk|ru|en)\/all-countries(?:\/[^/]+){0,2}\/?$/.test(pathname)
  );
}
