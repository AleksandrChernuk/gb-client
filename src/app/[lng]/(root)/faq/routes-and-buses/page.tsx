import FaqTabs from '@/components/pages/faq/FaqTabs';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { Params } from '@/types/common.types';
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
    title: t('faq_routes_buses.title'),
    description: t('faq_routes_buses.description'),
    keywords: t('faq_routes_buses.keywords'),

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
      canonical: `/${lng}/faq/routes-and-buses`,
      languages: {
        'x-default': '/uk/faq/routes-and-buses',
        uk: '/uk/faq/routes-and-buses',
        en: '/en/faq/routes-and-buses',
        ru: '/ru/faq/routes-and-buses',
      },
    },

    openGraph: {
      images: '/logo.png',
    },
  };
}

export default async function RoutesAndBuses({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);
  return <FaqTabs />;
}
