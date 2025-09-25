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
    title: t('faq.title'),
    description: t('faq.description'),
    keywords: t('faq.keywords'),

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
      canonical: `/${lng}/faq`,
      languages: {
        'x-default': '/uk/faq',
        uk: '/uk/faq',
        en: '/en/faq',
        ru: '/ru/faq',
      },
    },

    openGraph: {
      images: '/logo.png',
    },
  };
}

export default async function Faq({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);

  return <FaqTabs />;
}
