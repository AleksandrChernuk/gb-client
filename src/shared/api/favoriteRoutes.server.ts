import { BACKEND_URL } from '@/shared/configs/constants';
import { IFavoriteRoute, IFavoriteRouteBySlugParams, IFavoriteRoutesResponse } from '@/shared/types/favoriteRoutes';

export class FavoriteRouteNotFoundError extends Error {
  constructor(slug: string) {
    super(`Favorite route not found for slug: ${slug}`);
    this.name = 'FavoriteRouteNotFoundError';
  }
}

export function isFavoriteRouteNotFoundError(error: unknown): error is FavoriteRouteNotFoundError {
  return error instanceof FavoriteRouteNotFoundError;
}

export async function getFavoriteRoutes(params?: {
  page?: number;
  perPage?: number;
  lang?: string;
}): Promise<IFavoriteRoutesResponse> {
  const query = new URLSearchParams();
  if (params?.page) query.append('page', String(params.page));
  if (params?.perPage) query.append('perPage', String(params.perPage));

  const response = await fetch(`${BACKEND_URL}/api/v1/routes/favorite-routes?${query.toString()}`, {
    headers: {
      Accept: 'application/json',
      'Accept-Language': params?.lang ?? 'uk',
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) throw new Error(`Failed to fetch favorite routes: ${response.status}`);

  return response.json();
}

export async function getAllFavoriteRoutes(params?: { lang?: string }): Promise<IFavoriteRoute[]> {
  const routesBySlug = new Map<string, IFavoriteRoute>();
  let page = 1;
  let totalPages = 1;

  do {
    // perPage 20 тримає відповідь < 2 МБ, щоб Next data cache кешував її
    // (повний об'єкт маршруту важкий; 100 шт давали ~5 МБ і не кешувались).
    const response = await getFavoriteRoutes({ page, perPage: 20, lang: params?.lang });

    for (const route of response.data) {
      if (route.slug) {
        routesBySlug.set(route.slug, route);
      }
    }

    totalPages = response.totalPages || page;
    page++;
  } while (page <= totalPages && page <= 100);

  return [...routesBySlug.values()];
}

export async function getFavoriteRouteBySlug(params: IFavoriteRouteBySlugParams): Promise<IFavoriteRoute> {
  if (!BACKEND_URL) throw new Error('BACKEND_URL is not configured');

  const url = new URL(`${BACKEND_URL}/api/v1/routes/favorite-routes/by-slug`);
  url.searchParams.set('slug', params.slug);

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new FavoriteRouteNotFoundError(params.slug);
    }

    throw new Error(`Failed to fetch favorite route by slug: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<IFavoriteRoute>;
}
