import { BASE_URL, ORG_ID } from '@/shared/configs/constants';
import { IAuthorFullResponse } from '@/shared/types/author.types';
import { Locale } from 'next-intl';

export function buildAuthorUrl(slug: string, lng: Locale | string): string {
  return `${BASE_URL}/${lng}/authors/${slug}/`;
}

export function buildAuthorSchema(author: IAuthorFullResponse, lng: Locale) {
  const authorUrl = buildAuthorUrl(author.slug, lng);

  const sameAs = author.socialLinks.map((link) => link.socialLink).filter(Boolean);

  const person = {
    '@type': 'Person',
    '@id': `${authorUrl}#person`,
    name: author.name?.authorName,
    url: authorUrl,
    mainEntityOfPage: authorUrl,
    ...(author.role?.authorRole ? { jobTitle: author.role.authorRole } : {}),
    ...(author.role?.authorRole ? { knowsAbout: author.role.authorRole } : {}),
    ...(author.credentials?.authorCredentials
      ? {
          hasCredential: {
            '@type': 'EducationalOccupationalCredential',
            name: author.credentials.authorCredentials,
          },
        }
      : {}),
    ...(author.bio?.authorBio ? { description: author.bio.authorBio } : {}),
    ...(author.photo ? { image: author.photo } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    // Посилання на глобальну Organization (@id) — з лого, контактами та sameAs.
    worksFor: { '@id': ORG_ID },
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    inLanguage: lng,
    url: authorUrl,
    mainEntity: person,
  };
}
