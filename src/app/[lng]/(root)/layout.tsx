import MainHeader from '@/components/modules/header/MainHeader';
import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';

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
    <div className="flex flex-col h-screen">
      <MainHeader />
      {children}
    </div>
  );
}
