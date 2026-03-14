import { BACKEND_URL_API } from '@/shared/configs/constants';
import { ICountriesResponse, ICountry } from '@/shared/types/countries.types';

export async function getAllCountries(): Promise<ICountry[]> {
  const response = await fetch(`${BACKEND_URL_API}/countries?perPage=1000`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch countries: ${response.status}`);
  }

  const data = (await response.json()) as ICountriesResponse;
  return data.data;
}

export async function getCountryById(id: number): Promise<ICountry | null> {
  const response = await fetch(`${BACKEND_URL_API}/countries/${id}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Failed to fetch country: ${response.status}`);
  }

  return response.json() as Promise<ICountry>;
}
