export const dynamic = 'force-dynamic';
export const revalidate = 0;

import MainFooter from '@/components/modules/footer/MainFooter';
import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Herow from './_modules/Herow';
import Benefits from './_modules/Benefits';
import Buses from './_modules/Buses';
import PopularRoutes from './_modules/PopularRoutes';
import GetStarted from './_modules/GetStarted';
import Questions from './_modules/Questions';
import { MESSAGE_FILES } from '@/constans/message.file.constans';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  const t = await getTranslations({ locale: lng, namespace: MESSAGE_FILES.METADATA });

  return {
    title: t('main.title'),
    description: t('main.description'),

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
      canonical: '/',
      languages: {
        uk: '/uk',
        en: '/en',
        ru: '/ru',
      },
    },
    openGraph: {
      images: '/logo.png',
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

  return (
    <>
      <main role="main" className="bg-slate-50 dark:bg-slate-900">
        <Herow />
        <Benefits />
        <Buses />
        <PopularRoutes />
        <GetStarted />
        {/* <Carriers /> */}
        <Questions />
      </main>
      <MainFooter />
    </>
  );
}
