'use server';

import { ILocation, ILocationQueryParams } from '@/shared/types/location.types';

const BASE_URL = 'https://greenbus-backend.onrender.com/api/v1';

async function fetchFromApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const getLocations = async (params: ILocationQueryParams) => {
  const queryParams = new URLSearchParams();

  if (params.query) queryParams.append('query', params.query);
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.perPage) queryParams.append('perPage', params.perPage.toString());

  const endpoint = `locations?${queryParams.toString()}`;
  return fetchFromApi<{
    data: ILocation[];
    totalLocations: number;
    page: number;
    perPage: number;
    totalPages: number;
  }>(endpoint);
};

export const getLocationById = async (id: number) => {
  const endpoint = `locations/${id}`;
  return fetchFromApi<ILocation>(endpoint);
};

export const getLocationBySlug = async (slug: string): Promise<ILocation | null> => {
  // Неіснуючий слаг (404) → null, щоб сторінка віддала 404 (notFound), а не 500.
  const response = await fetch(`${BASE_URL}/locations/slug/${slug}`, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const getFavoriteLocations = async () => {
  const endpoint = `locations/favorites`;
  return fetchFromApi<ILocation[]>(endpoint);
};

export const getAllLocationsForSitemap = async () => {
  const perPage = 1000;
  const firstPage = await getLocations({ page: 1, perPage });

  if (firstPage.totalPages <= 1) {
    return firstPage.data;
  }

  const remainingPages = await Promise.all(
    Array.from({ length: firstPage.totalPages - 1 }, (_, index) => getLocations({ page: index + 2, perPage })),
  );

  return [firstPage, ...remainingPages].flatMap((page) => page.data);
};
