import MainFooter from '@/components/modules/footer/MainFooter';
import MainHeader from '@/components/modules/header/MainHeader';
import MainPage from '@/components/pages/main';
import { seoMain } from '@/lib/seo';
import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: 'uk' | 'ru' | 'en' };

  return {
    title: seoMain.title[lng],
    description: seoMain.description[lng],
    keywords: seoMain.keywords[lng],
  };
}

export default async function Home({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;
  setRequestLocale(lng as Locale);
  return (
    <div className="flex flex-col h-screen">
      <MainHeader />
      <MainPage />
      <MainFooter />
    </div>
  );
}
