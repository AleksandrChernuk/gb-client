import { ILocation, ILocationQueryParams } from "@/types/location.types";

const BASE_URL = "https://greenbus-backend.onrender.com/api/v1";

async function fetchFromApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const getLocations = async (params: ILocationQueryParams) => {
  const queryParams = new URLSearchParams();

  if (params.query) queryParams.append("query", params.query);
  if (params.page) queryParams.append("page", params.page.toString());
  if (params.perPage) queryParams.append("perPage", params.perPage.toString());

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

export const getFavoriteLocations = async () => {
  const endpoint = `locations/favorites`;
  return fetchFromApi<ILocation[]>(endpoint);
};
