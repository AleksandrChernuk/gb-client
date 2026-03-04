import { BACKEND_URL } from '@/shared/configs/constants';
import { IFavoriteRoute, IFavoriteRouteBySlugParams, IFavoriteRoutesResponse } from '@/shared/types/favoriteRoutes';

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
    throw new Error(`Failed to fetch favorite route by slug: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<IFavoriteRoute>;
}
