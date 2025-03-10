import FaqPage from '@/components/pages/FaqPage';
import { seoFaq } from '@/lib/seo';
import { Params } from '@/types/common.types';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: 'uk' | 'ru' | 'en' };

  return {
    title: seoFaq.title[lng],
    description: seoFaq.description[lng],
    keywords: seoFaq.keywords[lng],
  };
}

export default async function Faq() {
  return <FaqPage />;
}
