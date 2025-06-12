import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { MESSAGE_FILES } from '@/constans/message.file.constans';
import Main from '@/components/pages/main';

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
    title: t('main.title'),
    description: t('main.description'),
    keywords: t('main.keywords'),

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
      canonical: `/${lng}`,
      languages: {
        'x-default': '/uk',
        uk: '/uk',
        en: '/en',
        ru: '/ru',
      },
    },

    openGraph: {
      images: `/images/logo.png`,
    },
  };
}

export default async function Home({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;
  setRequestLocale(lng as Locale);

  return <Main />;
}
