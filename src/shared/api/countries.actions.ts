import { BACKEND_URL_API } from '@/shared/configs/constants';
import { ICountriesResponse, ICountry, ICountryLight } from '@/shared/types/countries.types';

const DEFAULT_LANGUAGE = 'uk';

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

export const getCountryBySlug = async (
  slug: string,
  language: string = DEFAULT_LANGUAGE,
): Promise<ICountryLight | null> => {
  const response = await fetch(`${BACKEND_URL_API}/countries/slug/${slug}?language=${language}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 600 },
  });

  // Неіснуючий слаг (404) — це не помилка сервера, а відсутня сторінка:
  // повертаємо null, щоб сторінка віддала коректний 404 (notFound), а не 500.
  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
