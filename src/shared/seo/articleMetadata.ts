import { BASE_URL } from '@/shared/configs/constants';
import { IArticleResponse } from '@/shared/types/article.types';
import { Locale } from 'next-intl';

const toIsoString = (date: Date | string): string => {
  return typeof date === 'string' ? date : date.toISOString();
};

export function buildArticleMetadata(article: IArticleResponse, lng: Locale, slug: string) {
  const desc = article.descriptions.find((d) => d.language === lng) ?? article.descriptions[0];

  const cover = article.photos.find((p) => p.isCover);
  const path = `blog/${slug}/`;
  const url = `${BASE_URL}/${lng}/${path}`;

  const getOgLocale = (locale: Locale): string => {
    const map: Record<Locale, string> = {
      uk: 'uk_UA',
      ru: 'ru_RU',
      en: 'en_US',
    };
    return map[locale] ?? 'uk_UA';
  };

  return {
    title: desc.metaTitle,
    description: desc.metaDescription,

    alternates: {
      canonical: url,
      languages: {
        'x-default': `${BASE_URL}/uk/${path}`,
        uk: `${BASE_URL}/uk/${path}`,
        ru: `${BASE_URL}/ru/${path}`,
        en: `${BASE_URL}/en/${path}`,
      },
    },

    openGraph: {
      title: desc.title,
      description: desc.description,
      url,
      siteName: 'GreenBus',
      images: cover
        ? [
            {
              url: cover.url,
              width: 1200,
              height: 630,
              alt: cover.alt ?? desc.title,
            },
          ]
        : [
            {
              url: `${BASE_URL}/og-image.png`,
              width: 1200,
              height: 630,
              alt: 'GreenBus',
            },
          ],
      locale: getOgLocale(lng),
      type: 'article',
      publishedTime: toIsoString(article.createdAt),
      modifiedTime: toIsoString(article.updatedAt),
    },

    twitter: {
      card: 'summary_large_image',
      title: desc.title,
      description: desc.description,
      images: cover ? [cover.url] : [`${BASE_URL}/og-image.png`],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}
