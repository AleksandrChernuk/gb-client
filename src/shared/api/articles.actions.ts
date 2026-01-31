import { BACKEND_URL, BACKEND_URL_API } from '@/shared/configs/constants';
import {
  IArticleRequest,
  IArticleResponse,
  IFindAllArticlesOptions,
  TGetArticlesResponse,
} from '@/shared/types/article.types';

export async function createArticles(body: IArticleRequest) {
  const response = await fetch(`${BACKEND_URL}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Error');
  }
  return null;
}

export async function getArticleBySlug(slug: string): Promise<IArticleResponse> {
  const url = `${BACKEND_URL_API}/articles/${slug}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.message || `Failed to fetch article: ${response.status}`);
    }

    const data = (await response.json()) as IArticleResponse;
    return data;
  } catch (error) {
    console.error('[getArticleBySlug] error:', error);
    throw error;
  }
}

export async function getArticles(query?: IFindAllArticlesOptions): Promise<TGetArticlesResponse> {
  const queryParams = new URLSearchParams();

  if (query?.page != null) queryParams.append('page', String(query.page));
  if (query?.perPage != null) queryParams.append('perPage', String(query.perPage));
  if (query?.language) queryParams.append('language', query.language);
  if (query?.countryId != null) queryParams.append('countryId', String(query.countryId));
  if (query?.locationId != null) queryParams.append('locationId', String(query.locationId));
  if (query?.hashtag?.trim()) queryParams.append('hashtag', query.hashtag);

  const url =
    queryParams.toString().length > 0
      ? `${BACKEND_URL_API}/articles?${queryParams.toString()}`
      : `${BACKEND_URL_API}/articles`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept-Language': 'uk',
        Accept: 'application/json',
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    return await response.json();
  } catch (error) {
    console.error('[getArticles] error:', error);

    return {
      data: [],
      pagination: {
        page: query?.page ?? 1,
        perPage: query?.perPage ?? 20,
        totalPages: 1,
      },
    };
  }
}
