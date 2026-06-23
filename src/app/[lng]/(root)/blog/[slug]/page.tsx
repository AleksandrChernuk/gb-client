export const revalidate = 600;

import { getArticleBySlug, getArticles } from '@/shared/api/articles.actions';
import { getAuthorBySlug } from '@/shared/api/authors.actions';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { buildArticleMetadata } from '@/shared/seo/articleMetadata';
import { IArticleResponse } from '@/shared/types/article.types';
import { AspectRatio } from '@/shared/ui/aspect-ratio';
import { BreadcrumbSimple } from '@/shared/ui/BreadcrumbSimple';
import { Container } from '@/shared/ui/Container';
import { H1 } from '@/shared/ui/H1';
import Main from '@/shared/ui/Main';
import Section from '@/shared/ui/Section';
import { ShareButton } from '@/shared/ui/ShareButton';
import MainFooter from '@/widgets/footer/MainFooter';
import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Script from 'next/script';
import { buildBreadcrumbSchema } from '@/shared/seo/breadcrumbs.schema';
import { BASE_URL } from '@/shared/configs/constants';
import parse, { domToReact } from 'html-react-parser';
import { notFound } from 'next/navigation';
import { Link, routing } from '@/shared/i18n/routing';
import { buildArticleSchema } from '@/shared/seo/article.schema';
import { getInternalSeoHref } from '@/shared/seo/internal-links';
import { ArticleAuthorBox } from '@/features/article-author';
import { ArticleCta } from '@/features/article-cta';
import { RelatedArticles } from '@/widgets/related-articles';
import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import { Separator } from '@/shared/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

export async function generateStaticParams() {
  const PER_PAGE = 100;

  const first = await getArticles({ page: 1, perPage: PER_PAGE });
  const articles = [...first.data];

  for (let page = 2; page <= first.totalPages; page++) {
    const res = await getArticles({ page, perPage: PER_PAGE });
    articles.push(...res.data);
  }

  return articles.flatMap((article) =>
    routing.locales.map((lng) => ({
      lng,
      slug: article.slug,
    })),
  );
}

const options = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  replace(domNode: any) {
    if (domNode.name === 'a' && domNode.attribs?.href) {
      const href = domNode.attribs.href;
      const internalHref = getInternalSeoHref(href);
      const isAbsolute = /^https?:\/\//i.test(href);

      if (internalHref) {
        return (
          <Link href={internalHref} prefetch={false}>
            {domToReact(domNode.children, options)}
          </Link>
        );
      }

      if (isAbsolute) {
        return (
          <a href={href} target="_blank" rel="nofollow noopener noreferrer">
            {domToReact(domNode.children, options)}
          </a>
        );
      }

      return <a href={href}>{domToReact(domNode.children, options)}</a>;
    }
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lng: Locale; slug: string }> }) {
  const { lng, slug } = await params;
  const article = await getArticleBySlug(slug, lng);

  if (!article) {
    return { title: 'Not Found', robots: { index: false, follow: true } };
  }

  return buildArticleMetadata(article, lng, slug);
}

function getDescriptionByLang(article: IArticleResponse, lang: string) {
  return article.descriptions.find((d) => d.language === lang) ?? article.descriptions[0];
}

export default async function SlugPage({ params }: { params: Promise<{ lng: string; slug: string }> }) {
  const { lng, slug } = await params;

  const article = await getArticleBySlug(slug, lng);

  if (!article) notFound();

  const cover = article.photos.find((p) => p.isCover);
  const t = await getTranslations(MESSAGE_FILES.COMMON);

  const fullAuthor = article.author ? await getAuthorBySlug(article.author.slug, lng).catch(() => null) : null;

  const desc = getDescriptionByLang(article, lng);

  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      {
        name: t('breadcrumb_main'),
        url: `${BASE_URL}/${lng}/`,
      },
      {
        name: t('breadcrumb_blog'),
        url: `${BASE_URL}/${lng}/blog/`,
      },
      { name: desc.title, url: `${BASE_URL}/${lng}/blog/${article.slug}/` },
    ],
    lng,
  );

  const articleSchema = buildArticleSchema(article, lng as Locale, fullAuthor);

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Main>
        <Section>
          <Container size="m">
            <div className="mb-10 flex items-center justify-between gap-2">
              <BreadcrumbSimple
                linkClassName="text-slate-700 dark:text-slate-50"
                pageClassName="text-slate-700 dark:text-slate-50"
                locale={lng as Locale}
                items={[
                  { label: t('breadcrumb_main'), href: '/' },
                  { label: t('breadcrumb_blog'), href: '/blog/' },
                  {
                    label: desc.title,
                    href: `/blog/${article.slug}/`,
                  },
                ]}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-10">
              <div className="flex items-center gap-2 text-xs tablet:text-base">
                <div className="flex items-center gap-2">
                  <CalendarDays className="stroke-slate-700 dark:stroke-slate-50" />{' '}
                  <p className="text-slate-700 dark:text-slate-50">
                    {format(new Date(article.updatedAt), 'dd.MM.yyyy')}
                  </p>
                </div>

                <Separator className="h-4 bg-stro-400 dark:bg-stone-200" orientation="vertical" />
                <div>
                  <ShareButton shareUrl={`${BASE_URL}/${lng}/blog/${article.slug}/`} title={desc.title} />
                </div>
              </div>
              {article.author?.name?.authorName && (
                <div className="flex items-center gap-3">
                  <Link
                    href={`/authors/${article.author.slug}/`}
                    prefetch={false}
                    className="group flex items-center gap-2.5 rounded-full border border-slate-200/80 bg-white/60 dark:border-slate-800/80 dark:bg-slate-900/30 p-1 pr-3.5 hover:border-green-300 dark:hover:border-green-600/50 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all duration-200 shadow-2xs"
                  >
                    {article.author.photo ? (
                      <Avatar className="h-7 w-7 ring-2 ring-transparent group-hover:ring-green-100 dark:group-hover:ring-green-950 transition-all duration-200">
                        <AvatarImage
                          src={article.author.photo}
                          alt={article.author.name.authorName}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-green-50 dark:bg-green-950 text-[10px] font-bold text-green-700 dark:text-green-300">
                          {article.author.name.authorName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <span
                        aria-hidden
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-green-50 text-[10px] font-bold text-green-700 dark:bg-green-950 dark:text-green-300 ring-2 ring-transparent group-hover:ring-green-100 dark:group-hover:ring-green-950 transition-all"
                      >
                        {article.author.name.authorName.charAt(0)}
                      </span>
                    )}
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 group-hover:text-green-300 dark:group-hover:text-green-600 transition-colors duration-200">
                      {article.author.name.authorName}
                    </span>
                  </Link>
                </div>
              )}
            </div>

            <H1>{desc.title}</H1>
            {cover && (
              <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg mb-4">
                <Image src={cover.url} alt={cover.alt} fill className="h-full w-full rounded-lg object-cover" />
              </AspectRatio>
            )}
            <article className="[&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:mt-6 [&_h3]:mb-3 [&_h4]:mt-4 [&_h4]:mb-2 [&_p]:mt-4 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_ol]:space-y-2 [&_li]:pl-1 [&_a]:text-green-300 [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-green-300/40 hover:[&_a]:text-green-400 hover:[&_a]:decoration-green-400 dark:[&_a]:text-green-100 dark:[&_a]:decoration-green-100/30 dark:hover:[&_a]:text-green-200 dark:hover:[&_a]:decoration-green-200 max-w-none dark:text-slate-200 ">
              {parse(desc.content, options)}
            </article>

            <ArticleCta />
            {article.author && (
              <ArticleAuthorBox
                slug={article.author.slug}
                name={article.author.name?.authorName ?? fullAuthor?.name?.authorName ?? ''}
                role={article.author.role?.authorRole ?? fullAuthor?.role?.authorRole}
                photo={article.author.photo ?? fullAuthor?.photo}
                bio={fullAuthor?.bio?.authorBio}
              />
            )}
            <RelatedArticles
              lng={lng as Locale}
              currentSlug={article.slug}
              countryId={article.countryId}
              locationId={article.locationId}
            />
          </Container>
        </Section>
      </Main>
      <MainFooter />
    </>
  );
}
