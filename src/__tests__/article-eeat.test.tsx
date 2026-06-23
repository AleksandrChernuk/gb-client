import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { ArticleCard } from '@/features/acricles-card';
import { buildArticleSchema } from '@/shared/seo/article.schema';
import { IArticleListItem, IArticleResponse } from '@/shared/types/article.types';

jest.mock('next/image', () => {
  const React = require('react');

  return {
    __esModule: true,
    default: ({ fill, priority, quality, sizes, ...props }: any) => React.createElement('img', props),
  };
});

jest.mock('next/link', () => {
  const React = require('react');

  return {
    __esModule: true,
    default: ({
      href,
      children,
      prefetch,
      ...props
    }: {
      href: string;
      children: React.ReactNode;
      prefetch?: boolean;
    }) =>
      React.createElement('a', { href, ...props }, children),
  };
});

describe('article E-E-A-T signals', () => {
  const baseArticle = {
    id: 1,
    slug: 'legacy-guide',
    hashtags: [],
    descriptions: [
      {
        language: 'uk',
        title: 'Legacy guide',
        description: 'Legacy guide description',
        content: '<p>Body</p>',
      },
    ],
    photos: [],
    countryId: null,
    locationId: null,
    authorId: null,
    author: null,
    ratingAverage: '0',
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-02T00:00:00.000Z'),
  } satisfies IArticleResponse;

  it('uses an editorial Person author in Article schema when CMS article author is missing', () => {
    const schema = buildArticleSchema(baseArticle, 'uk');

    expect(schema.author).toMatchObject({
      '@type': 'Person',
      '@id': 'https://greenbus.com.ua/#editorial-author',
      name: 'Редакція GreenBus',
      worksFor: { '@id': 'https://greenbus.com.ua/#organization' },
    });
    expect(schema.publisher).toEqual({ '@id': 'https://greenbus.com.ua/#organization' });
    expect(schema.datePublished).toBe('2026-01-01T00:00:00.000Z');
    expect(schema.dateModified).toBe('2026-01-02T00:00:00.000Z');
    expect(schema.mainEntityOfPage).toMatchObject({
      '@type': 'WebPage',
      '@id': 'https://greenbus.com.ua/uk/blog/legacy-guide/',
    });
  });

  it('links the existing article card author to the localized author page', () => {
    const article = {
      id: 2,
      slug: 'authored-guide',
      hashtags: [],
      texts: {
        title: 'Authored guide',
        description: 'Authored guide description',
      },
      photo: null,
      authorId: 7,
      author: {
        id: 7,
        slug: 'redaktsiya-greenbus',
        name: { language: 'uk', authorName: 'Редакція GreenBus' },
        role: null,
        photo: null,
      },
      ratingAverage: '0',
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
      updatedAt: new Date('2026-01-02T00:00:00.000Z'),
    } satisfies IArticleListItem;

    const html = renderToStaticMarkup(<ArticleCard article={article} lang="uk" />);

    expect(html).toContain('href="/uk/blog/authored-guide/"');
    expect(html).toContain('href="/uk/authors/redaktsiya-greenbus/"');
    expect(html).toContain('Редакція GreenBus');
  });
});
