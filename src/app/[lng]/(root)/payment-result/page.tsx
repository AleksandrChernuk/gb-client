import PaymentResultPage from '@/components/pages/payment-result';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ lng: string }>;
  searchParams: Promise<{ payment_id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  const t = await getTranslations({
    locale: lng,
    namespace: MESSAGE_FILES.METADATA,
  });

  return {
    title: t('success.title'),
    description: t('success.description'),
    keywords: t('success.keywords'),

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
      canonical: `/${lng}/result`,
      languages: {
        'x-default': '/uk/result',
        uk: '/uk/result',
        en: '/en/result',
        ru: '/ru/result',
      },
    },

    openGraph: {
      images: '/logo.png',
    },
  };
}

export default async function Success({ params, searchParams }: Props) {
  const { lng } = await params;
  const { payment_id } = await searchParams;

  setRequestLocale(lng as Locale);

  return <PaymentResultPage payment_id={payment_id} />;
}
