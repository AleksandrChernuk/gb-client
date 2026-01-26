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
      credentials: 'include',
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

export async function getArticles(quey?: IFindAllArticlesOptions): Promise<TGetArticlesResponse | { error: string }> {
  const queryParams = new URLSearchParams();

  if (quey?.page !== undefined && quey.page !== null) {
    queryParams.append('page', String(quey.page));
  }

  if (quey?.perPage !== undefined && quey.perPage !== null) {
    queryParams.append('perPage', String(quey.perPage));
  }

  if (quey?.language) {
    queryParams.append('language', quey.language);
  }

  if (quey?.countryId != null) {
    queryParams.append('countryId', String(quey.countryId));
  }

  if (quey?.locationId != null) {
    queryParams.append('locationId', String(quey.locationId));
  }

  if (quey?.hashtag && quey.hashtag.trim() !== '') {
    queryParams.append('hashtag', quey.hashtag);
  }

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
      next: {
        revalidate: 3600,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { error: errorData?.message || 'Failed to fetch articles' };
    }

    const data = (await response.json()) as TGetArticlesResponse;
    return data;
  } catch (error) {
    console.error('[geArticlesClientComponent] error:', error);
    return { error: 'Failed to fetch articles' };
  }
}
