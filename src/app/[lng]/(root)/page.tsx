import MainFooter from '@/components/modules/footer/MainFooter';
import MainPage from '@/components/pages/main';
import { seoMain } from '@/lib/seo';
import { Params } from '@/types/common.types';

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

export default function Home() {
  return (
    <>
      <MainPage />
      <MainFooter />
    </>
  );
}
