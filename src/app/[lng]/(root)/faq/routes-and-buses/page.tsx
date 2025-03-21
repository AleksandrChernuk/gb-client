import FaqPage from '@/components/pages/faq';
import { seoFaqRoutesBuses } from '@/lib/seo';
import { Params } from '@/types/common.types';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: 'uk' | 'ru' | 'en' };

  return {
    title: seoFaqRoutesBuses.title[lng],
    description: seoFaqRoutesBuses.description[lng],
    keywords: seoFaqRoutesBuses.keywords[lng],
  };
}

export default async function RoutesAndBuses() {
  return <FaqPage />;
}
