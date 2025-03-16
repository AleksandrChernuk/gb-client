import ThirdFooter from '@/components/modules/footer/ThirdFooter';
import ForСarriersPage from '@/components/pages/for-carriers';
import { seoForCarriers } from '@/lib/seo';
import { Params } from '@/types/common.types';

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

export default function ForCarriers() {
  return (
    <>
      <ForСarriersPage />
      <ThirdFooter />
    </>
  );
}
