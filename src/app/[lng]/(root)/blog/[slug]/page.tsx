import { getArticleBySlug, getArticles } from '@/shared/api/articles.actions';
import { IArticleResponse } from '@/shared/types/article.types';
import { AspectRatio } from '@/shared/ui/aspect-ratio';
import BackRouteButton from '@/shared/ui/BackRouteButton';
import { Container } from '@/shared/ui/Container';
import MainFooter from '@/widgets/footer/MainFooter';
import { Locale } from 'next-intl';
import Image from 'next/image';

const baseUrl = 'https://greenbus.com.ua';

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

export async function generateMetadata({ params }: { params: Promise<{ lng: Locale; slug: string }> }) {
  const { lng, slug } = await params;

  const article = await getArticleBySlug(slug);

  const desc = article.descriptions.find((d) => d.language === lng) ?? article.descriptions[0];
  const cover = article.photos.find((p) => p.isCover);

  const path = `blog/${slug}`;
  const url = `${baseUrl}/${lng}/${path}`;

  return {
    title: desc.metaTitle,
    description: desc.metaDescription,
    metadataBase: new URL(baseUrl),

    alternates: {
      canonical: url,
      languages: {
        'x-default': `${baseUrl}/uk/${path}`,
        uk: `${baseUrl}/uk/${path}`,
        ru: `${baseUrl}/ru/${path}`,
        en: `${baseUrl}/en/${path}`,
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
        : [],
      locale: lng,
      type: 'article',
    },

    twitter: {
      card: 'summary_large_image',
      title: desc.title,
      description: desc.description,
      images: cover ? [cover.url] : [],
    },

    robots: {
      index: true,
      follow: true,
    },

    appleWebApp: {
      title: 'GreenBus',
      capable: true,
      statusBarStyle: 'default',
    },

    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
    },

    manifest: '/manifest.json',
  };
}

function getDescriptionByLang(article: IArticleResponse, lang: string) {
  return article.descriptions.find((d) => d.language === lang) ?? article.descriptions[0];
}

export default async function SlugPage({ params }: { params: Promise<{ lng: string; slug: string }> }) {
  const { lng, slug } = await params;

  const article = await getArticleBySlug(slug);
  const cover = article.photos.find((p) => p.isCover);

  const desc = getDescriptionByLang(article, lng);

  return (
    <>
      {' '}
      <main className="bg-slate-50 dark:bg-slate-900 flex-1">
        <section className="py-10">
          <Container size="m">
            <div className="mb-4">
              <BackRouteButton />
            </div>
            <h1 className="text-2xl font-semibold mb-4">{desc.title}</h1>
            {cover && (
              <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg mb-4">
                <Image src={cover.url} alt={cover.alt} fill className="h-full w-full rounded-lg object-cover" />
              </AspectRatio>
            )}
            <div
              className="prose max-w-none space-y-4 dark:text-slate-200"
              dangerouslySetInnerHTML={{ __html: desc.content }}
            />
          </Container>
        </section>
      </main>
      <MainFooter />
    </>
  );
}
