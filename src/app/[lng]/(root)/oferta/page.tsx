import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { renderDocumentHtml } from '@/shared/lib/renderDocumentHtml';
import { Params } from '@/shared/types/common.types';
import { Container } from '@/shared/ui/Container';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  const t = await getTranslations({
    locale: lng,
    namespace: MESSAGE_FILES.METADATA,
  });

  return {
    title: t('oferta.title'),
    description: t('oferta.description'),
    keywords: t('oferta.keywords'),

    appleWebApp: {
      title: 'GreenBus',
      capable: true,
      statusBarStyle: 'default',
    },

    manifest: '/manifest.json',

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    metadataBase: new URL('https://greenbus.com.ua'),

    alternates: {
      canonical: `/${lng}/oferta`,
      languages: {
        'x-default': '/uk/oferta',
        uk: '/uk/oferta',
        en: '/en/oferta',
        ru: '/ru/oferta',
      },
    },

    openGraph: {
      images: '/logo.png',
    },
  };
}

export default async function Oferta({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);
  const t = await getTranslations(MESSAGE_FILES.OFERTA_PAGE);
  const textObj = t.raw('text') as Record<string, string>;
  const html = renderDocumentHtml(textObj);
  return (
    <main>
      <section>
        <Container size="l">
          <div className="py-10 text-slate-700 dark:text-slate-50">
            <h1 className="mb-4">{t('title')}</h1>
            <div className="space-y-2 text-xs" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </Container>
      </section>
    </main>
  );
}
