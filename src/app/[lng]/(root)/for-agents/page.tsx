import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import ForAgentsPage from '@/components/pages/for-agents';

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
    title: t('for-agents.title'),
    description: t('for-agents.description'),
    keywords: t('for-agents.keywords'),

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
      canonical: `/${lng}/for-agents`,
      languages: {
        'x-default': '/uk/for-agents',
        uk: '/uk/for-agents',
        en: '/en/for-agents',
        ru: '/ru/for-agents',
      },
    },

    openGraph: {
      images: '/logo.png',
    },
  };
}

export default async function ForAgents({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);

  return <ForAgentsPage />;
}
