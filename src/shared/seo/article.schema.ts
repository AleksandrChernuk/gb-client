import { BASE_URL, ORG_ID } from '@/shared/configs/constants';
import { IArticleResponse } from '@/shared/types/article.types';
import { IAuthorFullResponse } from '@/shared/types/author.types';
import { buildAuthorUrl } from '@/shared/seo/author.schema';
import { Locale } from 'next-intl';

const toIsoString = (date: Date | string): string => {
  return typeof date === 'string' ? date : date.toISOString();
};

/**
 * Будує Article JSON-LD з акцентом на E-E-A-T:
 * - author — реальна Person, пов'язана за стабільним @id зі сторінкою автора
 *   (там визначений повний Person через ProfilePage), з jobTitle/sameAs/опис;
 * - publisher — посилання на глобальну Organization (@id) з лого та контактами.
 *
 * fullAuthor (за наявності) збагачує Person біо, кваліфікацією та соцмережами.
 */
export function buildArticleSchema(article: IArticleResponse, lng: Locale, fullAuthor?: IAuthorFullResponse | null) {
  const desc = article.descriptions.find((d) => d.language === lng) ?? article.descriptions[0];
  const cover = article.photos.find((p) => p.isCover);
  const articleUrl = `${BASE_URL}/${lng}/blog/${article.slug}/`;

  const authorName = article.author?.name?.authorName ?? fullAuthor?.name?.authorName;

  let author;
  if (article.author && authorName) {
    const authorUrl = buildAuthorUrl(article.author.slug, lng);
    const jobTitle = article.author.role?.authorRole ?? fullAuthor?.role?.authorRole;
    const image = article.author.photo ?? fullAuthor?.photo;
    const description = fullAuthor?.bio?.authorBio;
    const sameAs = (fullAuthor?.socialLinks ?? []).map((l) => l.socialLink).filter(Boolean);

    author = {
      '@type': 'Person',
      '@id': `${authorUrl}#person`,
      name: authorName,
      url: authorUrl,
      ...(jobTitle ? { jobTitle } : {}),
      ...(image ? { image } : {}),
      ...(description ? { description } : {}),
      ...(sameAs.length > 0 ? { sameAs } : {}),
      worksFor: { '@id': ORG_ID },
    };
  } else {
    author = { '@id': ORG_ID };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: desc.title,
    description: desc.description,
    image: cover?.url ? [cover.url] : [`${BASE_URL}/${lng}/opengraph-image`],
    datePublished: toIsoString(article.createdAt),
    dateModified: toIsoString(article.updatedAt),
    inLanguage: lng,
    author,
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    url: articleUrl,
  };
}
