import ThirdFooter from '@/components/modules/footer/ThirdFooter';
import ForСarriersPage from '@/components/pages/for-carriers';
import { seoForCarriers } from '@/lib/seo';
import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: 'uk' | 'ru' | 'en' };

  return {
    title: seoForCarriers.title[lng],
    description: seoForCarriers.description[lng],
    keywords: seoForCarriers.keywords[lng],
  };
}

export default async function ForCarriers({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);
  return (
    <>
      <ForСarriersPage />
      <ThirdFooter />
    </>
  );
}
