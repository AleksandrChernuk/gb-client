import { ReactNode } from 'react';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Params } from '@/shared/types/common.types';
import MainHeader from '@/widgets/header/MainHeader';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);

  return (
    <div className="flex flex-col h-screen supports-[min-height:100dvh]:min-h-dvh">
      <MainHeader />
      {children}
    </div>
  );
}
