import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Params } from '@/shared/types/common.types';
import FaqTabs from '@/widgets/faq/FaqTabs';
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
      canonical: `/${lng}/faq/bronjuvannja-mists`,
      languages: {
        'x-default': '/uk/faq/bronjuvannja-mists',
        uk: '/uk/faq/bronjuvannja-mists',
        en: '/en/faq/bronjuvannja-mists',
        ru: '/ru/faq/bronjuvannja-mists',
      },
    },

    openGraph: {
      images: '/logo.png',
    },
  };
}

export default async function BronjuvannjaMists({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);
  return <FaqTabs />;
}
