export const revalidate = 600;

import { getArticleBySlug, getArticles } from '@/shared/api/articles.actions';
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
import Link from 'next/link';

export async function generateStaticParams() {
  const res = await getArticles({ perPage: 9999 });

  if ('error' in res) return [];

  const articles = res.data;

  return articles.flatMap((article) =>
    article.descriptions.map((desc) => ({
      lng: desc.language,
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

      return (
        <Link href={href} prefetch>
          {domToReact(domNode.children, options)}
        </Link>
      );
    }
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lng: Locale; slug: string }> }) {
  const { lng, slug } = await params;
  const article = await getArticleBySlug(slug);

  return buildArticleMetadata(article, lng, slug);
}

function getDescriptionByLang(article: IArticleResponse, lang: string) {
  return article.descriptions.find((d) => d.language === lang) ?? article.descriptions[0];
}

export default async function SlugPage({ params }: { params: Promise<{ lng: string; slug: string }> }) {
  const { lng, slug } = await params;

  const article = await getArticleBySlug(slug);
  const cover = article.photos.find((p) => p.isCover);
  const t = await getTranslations(MESSAGE_FILES.COMMON);

  const desc = getDescriptionByLang(article, lng);

  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      {
        name: t('breadcrumb_main'),
        url: `${BASE_URL}/${lng}`,
      },
      {
        name: t('breadcrumb_blog'),
        url: `${BASE_URL}/${lng}/blog`,
      },
      { name: desc.title, url: `/blog/${article.slug}` },
    ],
    lng,
  );

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Main>
        <Section>
          <Container size="m">
            <div className="mb-2 flex items-center justify-between gap-2">
              <BreadcrumbSimple
                items={[
                  { label: t('breadcrumb_main'), href: '/' },
                  { label: t('breadcrumb_blog'), href: '/blog' },
                ]}
              />
              <ShareButton shareUrl={`https://greenbus.com.ua/${lng}/blog/${article.slug}`} title={desc.title} />
            </div>
            <H1>{desc.title}</H1>{' '}
            {cover && (
              <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg mb-4">
                <Image src={cover.url} alt={cover.alt} fill className="h-full w-full rounded-lg object-cover" />
              </AspectRatio>
            )}
            <article className="[&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:mt-6 [&_h3]:mb-3 [&_h4]:mt-4 [&_h4]:mb-2 [&_p]:mt-4 [&_p]:mb-2 [&_ol]:space-y-2 [&_ul]:space-y-2 max-w-none dark:text-slate-200">
              {parse(desc.content, options)}
            </article>
          </Container>
        </Section>
      </Main>
      <MainFooter />
    </>
  );
}
