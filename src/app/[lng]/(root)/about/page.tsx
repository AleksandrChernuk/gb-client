import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import AboutPage from '@/components/pages/about';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: 'uk' | 'ru' | 'en' };
  const t = await getTranslations({ locale: lng });

  return {
    title: t('about.title'),
    description: t('about.description'),
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
  };
}

export default async function About({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);

  return <AboutPage />;
}
