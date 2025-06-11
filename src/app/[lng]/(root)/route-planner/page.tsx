import RoutePlannerPage from '@/components/pages/route-planner';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  const t = await getTranslations({ locale: lng, namespace: MESSAGE_FILES.METADATA });

  return {
    title: t('route-planner.title'),
    description: t('route-planner.description'),
    keywords: t('route-planner.keywords'),

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
      canonical: `/${lng}/route-planner`,
      languages: {
        'x-default': '/uk/route-planner',
        uk: '/uk/route-planner',
        en: '/en/route-planner',
        ru: '/ru/route-planner',
      },
    },

    openGraph: {
      images: '/logo.png',
    },
  };
}

export default async function RoutePlanner({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);

  return <RoutePlannerPage />;
}
