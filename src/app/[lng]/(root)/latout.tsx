import { ReactNode } from 'react';
import MainHeader from '@/components/modules/header/MainHeader';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Params } from '@/types/common.types';

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);

  return (
    <div className="flex flex-col h-screen ">
      <MainHeader />
      {children}
    </div>
  );
}
