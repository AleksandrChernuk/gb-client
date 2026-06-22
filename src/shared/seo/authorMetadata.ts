import { BASE_URL } from '@/shared/configs/constants';
import { IAuthorFullResponse } from '@/shared/types/author.types';
import { Locale } from 'next-intl';

export function buildAuthorMetadata(author: IAuthorFullResponse, lng: Locale, slug: string) {
  const path = `authors/${slug}/`;
  const url = `${BASE_URL}/${lng}/${path}`;

  const name = author.name?.authorName ?? 'GreenBus';
  const role = author.role?.authorRole;
  const title = role ? `${name} — ${role} | GreenBus` : `${name} | GreenBus`;
  const description = author.bio?.authorBio ?? author.credentials?.authorCredentials ?? name;

  const getOgLocale = (locale: Locale): string => {
    const map: Record<Locale, string> = {
      uk: 'uk_UA',
      ru: 'ru_RU',
      en: 'en_US',
    };
    return map[locale] ?? 'uk_UA';
  };

  const image = author.photo ?? `${BASE_URL}/${lng}/opengraph-image`;

  return {
    title,
    description,

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
      title,
      description,
      url,
      siteName: 'GreenBus',
      images: [{ url: image, width: 1200, height: 630, alt: name }],
      locale: getOgLocale(lng),
      type: 'profile',
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}
