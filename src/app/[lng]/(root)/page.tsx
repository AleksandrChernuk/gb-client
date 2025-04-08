import MainFooter from '@/components/modules/footer/MainFooter';
import { seoMain } from '@/lib/seo';
import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Herow from './_modules/Herow';
import Benefits from './_modules/Benefits';
import Buses from './_modules/Buses';
import PopularRoutes from './_modules/PopularRoutes';
import GetStarted from './_modules/GetStarted';
import Questions from './_modules/Questions';
import Carriers from './_modules/Carriers';

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
    <>
      <main role="main" className="bg-slate-50 dark:bg-slate-900">
        <Herow />
        <Benefits />
        <Buses />
        <PopularRoutes />
        <GetStarted />
        <Carriers />
        <Questions />
      </main>
      <MainFooter />
    </>
  );
}
