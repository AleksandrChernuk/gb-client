import AllCountriesPage from '@/components/pages/all-countries';
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
    title: t('all-countries.title'),
    description: t('all-countries.description'),
    keywords: t('all-countries.keywords'),

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
      canonical: `/${lng}/all-countries`,
      languages: {
        'x-default': '/uk/all-countries',
        uk: '/uk/all-countries',
        en: '/en/all-countries',
        ru: '/ru/all-countries',
      },
    },

    openGraph: {
      images: '/logo.png',
    },
  };
}

export default async function AllCountries({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);
  return <AllCountriesPage />;
}
