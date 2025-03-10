import FaqPage from '@/components/pages/FaqPage';
import { seoFaqBooking } from '@/lib/seo';
import { Params } from '@/types/common.types';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: 'uk' | 'ru' | 'en' };

  return {
    title: seoFaqBooking.title[lng],
    description: seoFaqBooking.description[lng],
    keywords: seoFaqBooking.keywords[lng],
  };
}

export default async function BronjuvannjaMists() {
  return <FaqPage />;
}
