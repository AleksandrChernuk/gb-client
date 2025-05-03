import AuthHeader from '@/components/modules/header/AuthHeader';
import ThirdFooter from '@/components/modules/footer/ThirdFooter';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from 'next-intl';
import { Params } from '@/types/common.types';

export async function generateMetadata() {
  return {
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
