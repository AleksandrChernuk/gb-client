import { IFavoriteRoute, IFavoriteRoutesResponse } from '@/shared/types/favoriteRoutes';

type PaginationParamsType = {
  page?: number;
  perPage?: number;
};

export async function getFavoriteRoutes(params?: PaginationParamsType): Promise<IFavoriteRoutesResponse> {
  const queryParams = new URLSearchParams();

  if (params?.page != null) queryParams.append('page', params.page.toString());
  if (params?.perPage != null) queryParams.append('perPage', params.perPage.toString());

  const queryString = queryParams.toString();
  const url = `/api/favorite-routes${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Accept-Language': 'uk',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch favorite routes: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<IFavoriteRoutesResponse>;
}

export async function getFavoriteRouteBySlugClient(slug: string, lang = 'uk'): Promise<IFavoriteRoute | null> {
  const response = await fetch(`/api/favorite-routes/by-slug?slug=${slug}&lang=${lang}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    credentials: 'include',
  });

  if (response.status === 404) return null;
  if (!response.ok) return null;

  return response.json();
}
