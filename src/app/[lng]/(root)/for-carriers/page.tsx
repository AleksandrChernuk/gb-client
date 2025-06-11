import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ForCarriersPage from '@/components/pages/for-carriers';
import { MESSAGE_FILES } from '@/constans/message.file.constans';

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
    title: t('for-cariers.title'),
    description: t('for-cariers.description'),
    keywords: '',

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
      canonical: `/${lng}/for-carriers`,
      languages: {
        'x-default': '/uk/for-carriers',
        uk: '/uk/for-carriers',
        en: '/en/for-carriers',
        ru: '/ru/for-carriers',
      },
    },

    openGraph: {
      images: '/logo.png',
    },
  };
}

export default async function ForCarriers({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);

  return <ForCarriersPage />;
}
