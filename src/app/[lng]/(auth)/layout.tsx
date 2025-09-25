export const dynamic = 'force-dynamic';
export const revalidate = 0;

import AuthHeader from '@/widgets/header/AuthHeader';
import ThirdFooter from '@/widgets/footer/ThirdFooter';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Locale } from 'next-intl';
import { Params } from '@/shared/types/common.types';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

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
    title: t('auth.title'),
    description: t('auth.description'),
    keywords: t('auth.keywords'),

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
      canonical: `/${lng}/signin`,
      languages: {
        'x-default': '/uk/signin',
        uk: '/uk/signin',
        en: '/en/signin',
        ru: '/ru/signin',
      },
    },

    openGraph: {
      images: '/logo.png',
    },
  };
}

export default async function AuthLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);
  return (
    <div className="flex flex-col h-dvh">
      <AuthHeader />

      <main role="main" className="flex items-center justify-center grow bg-slate-50 dark:bg-slate-900">
        {children}
      </main>

      <ThirdFooter />
    </div>
  );
}
