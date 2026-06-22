import { BACKEND_URL_API } from '@/shared/configs/constants';
import { IAuthorFullResponse } from '@/shared/types/author.types';

const DEFAULT_LANGUAGE = 'uk';

export async function getAuthorBySlug(
  slug: string,
  language: string = DEFAULT_LANGUAGE,
): Promise<IAuthorFullResponse | null> {
  const url = `${BACKEND_URL_API}/authors/slug/${slug}?language=${language}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      next: { revalidate: 600 },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch author: ${response.status}`);
    }

    return (await response.json()) as IAuthorFullResponse;
  } catch (error) {
    console.error('[getAuthorBySlug] error:', error);
    throw error;
  }
}
