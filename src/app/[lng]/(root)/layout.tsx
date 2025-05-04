export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { ReactNode } from 'react';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Params } from '@/types/common.types';
import MainHeader from '@/components/modules/header/MainHeader';

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
    <div className="flex flex-col h-svh">
      <MainHeader />
      {children}
    </div>
  );
}
