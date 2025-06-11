export const dynamic = 'force-dynamic';

import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Checkaut from '@/components/pages/checkout';
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
    title: t('checkout.title'),
    description: t('checkout.description'),
    keywords: t('checkout.keywords'),

    appleWebApp: {
      title: 'GreenBus',
      capable: true,
      statusBarStyle: 'default',
    },

    manifest: '/manifest.json',

    robots: {
      index: false,
      follow: false,
      nocache: false,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    metadataBase: new URL('https://greenbus.com.ua'),

    alternates: {
      canonical: `/${lng}/checkout`,
      languages: {
        'x-default': '/uk/checkout',
        uk: '/uk/checkout',
        en: '/en/checkout',
        ru: '/ru/checkout',
      },
    },

    openGraph: {
      images: '/logo.png',
    },
  };
}

export default async function Checkout({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);

  return <Checkaut />;
}
