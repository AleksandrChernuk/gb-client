export const revalidate = 600;

import { getArticles } from '@/shared/api/articles.actions';
import { getAuthorBySlug } from '@/shared/api/authors.actions';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { BASE_URL } from '@/shared/configs/constants';
import { buildAuthorMetadata } from '@/shared/seo/authorMetadata';
import { buildAuthorSchema } from '@/shared/seo/author.schema';
import { buildBreadcrumbSchema } from '@/shared/seo/breadcrumbs.schema';
import { AuthorSocials } from '@/features/author-socials';
import { ArticleCard } from '@/features/acricles-card';
import { BreadcrumbSimple } from '@/shared/ui/BreadcrumbSimple';
import { Container } from '@/shared/ui/Container';
import { H1 } from '@/shared/ui/H1';
import { H2 } from '@/shared/ui/H2';
import Main from '@/shared/ui/Main';
import Section from '@/shared/ui/Section';
import MainFooter from '@/widgets/footer/MainFooter';
import { routing } from '@/shared/i18n/routing';
import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';

type Params = { lng: Locale; slug: string };

const SSG_PER_PAGE = 100; // бекенд обмежує perPage значенням 100

export async function generateStaticParams() {
  try {
    const first = await getArticles({ perPage: SSG_PER_PAGE });
    const articles = [...first.data];

    for (let page = 2; page <= first.totalPages; page++) {
      const res = await getArticles({ page, perPage: SSG_PER_PAGE });
      articles.push(...res.data);
    }

    const authorSlugs = [
      ...new Set(
        articles
          .map((article) => article.author?.slug)
          .filter((slug): slug is string => typeof slug === 'string' && slug.length > 0),
      ),
    ];

    return authorSlugs.flatMap((slug) => routing.locales.map((lng) => ({ lng, slug })));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { lng, slug } = await params;
  const author = await getAuthorBySlug(slug, lng);

  if (!author) {
    return { title: 'Not Found', robots: { index: false, follow: true } };
  }

  return buildAuthorMetadata(author, lng, slug);
}

export default async function AuthorPage({ params }: { params: Promise<Params> }) {
  const { lng, slug } = await params;

  const author = await getAuthorBySlug(slug, lng);

  if (!author) notFound();

  const t = await getTranslations(MESSAGE_FILES.COMMON);
  const name = author.name?.authorName ?? '';

  const articlesRes = await getArticles({ language: lng, authorId: author.id, perPage: 12 });
  const articles = articlesRes.data;

  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      { name: t('breadcrumb_main'), url: `${BASE_URL}/${lng}/` },
      { name: t('breadcrumb_blog'), url: `${BASE_URL}/${lng}/blog/` },
      { name, url: `${BASE_URL}/${lng}/authors/${author.slug}/` },
    ],
    lng,
  );

  const authorSchema = buildAuthorSchema(author, lng);

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="author-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />
      <Main>
        <Section>
          <Container size="m">
            <BreadcrumbSimple
              linkClassName="text-slate-700 dark:text-slate-50"
              pageClassName="text-slate-700 dark:text-slate-50"
              locale={lng}
              items={[
                { label: t('breadcrumb_main'), href: '/' },
                { label: t('breadcrumb_blog'), href: '/blog/' },
                { label: name, href: `/authors/${author.slug}/` },
              ]}
            />

            {/* Картка автора */}
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 tablet:p-8">
              <div className="flex flex-col gap-6 tablet:flex-row tablet:items-start">
                {author.photo ? (
                  <Image
                    src={author.photo}
                    alt={name}
                    width={160}
                    height={160}
                    className="h-40 w-40 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="flex h-40 w-40 shrink-0 items-center justify-center rounded-full bg-green-200 text-5xl font-semibold text-green-700 dark:bg-slate-700 dark:text-green-200"
                  >
                    {name.charAt(0)}
                  </span>
                )}

                <div className="min-w-0">
                  <H1>{name}</H1>
                  {author.role?.authorRole && (
                    <p className="mt-2 text-lg font-semibold text-green-600 dark:text-green-300">
                      {author.role.authorRole}
                    </p>
                  )}
                  {author.credentials?.authorCredentials && (
                    <p className="mt-3 text-slate-700 dark:text-slate-200">
                      <span className="font-semibold">{t('author_education')}</span>{' '}
                      {author.credentials.authorCredentials}
                    </p>
                  )}
                  {author.bio?.authorBio && (
                    <p className="mt-3 max-w-3xl text-slate-700 dark:text-slate-200">{author.bio.authorBio}</p>
                  )}
                  <div className="mt-5">
                    <AuthorSocials links={author.socialLinks} />
                  </div>
                  <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                    {t('updated_label')} {format(new Date(author.updatedAt), 'dd.MM.yyyy')}
                  </p>
                </div>
              </div>
            </div>

            {/* Статті автора */}
            {articles.length > 0 && (
              <div className="mt-12">
                <H2>
                  {t('author_articles')} ({articlesRes.totalArticles || articles.length})
                </H2>
                <ul className="mt-4 grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
                  {articles.map((article) => (
                    <li key={article.id}>
                      <ArticleCard article={article} lang={lng} needDescription />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Container>
        </Section>
      </Main>
      <MainFooter />
    </>
  );
}
