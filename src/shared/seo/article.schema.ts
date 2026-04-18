import { BASE_URL } from '@/shared/configs/constants';
import { IArticleResponse } from '@/shared/types/article.types';
import { Locale } from 'next-intl';

const toIsoString = (date: Date | string): string => {
  return typeof date === 'string' ? date : date.toISOString();
};

export function buildArticleSchema(article: IArticleResponse, lng: Locale) {
  const desc = article.descriptions.find((d) => d.language === lng) ?? article.descriptions[0];
  const cover = article.photos.find((p) => p.isCover);
  const articleUrl = `${BASE_URL}/${lng}/blog/${article.slug}/`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: desc.title,
    description: desc.description,
    image: cover?.url ? [cover.url] : [`${BASE_URL}/og-image.png`],
    datePublished: toIsoString(article.createdAt),
    dateModified: toIsoString(article.updatedAt),
    inLanguage: lng,
    author: {
      '@type': 'Organization',
      name: 'GreenBus',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'GreenBus',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    url: articleUrl,
  };
}
