import OfertaPage from '@/components/pages/oferta';
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
    title: t('oferta.title'),
    description: t('oferta.description'),
    keywords: t('oferta.keywords'),

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
  };
}

export default async function Oferta({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);

  return <OfertaPage />;
}
