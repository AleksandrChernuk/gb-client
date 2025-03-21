import FaqPage from '@/components/pages/faq';
import { seoFaqTicketRefund } from '@/lib/seo';
import { Params } from '@/types/common.types';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: 'uk' | 'ru' | 'en' };

  return {
    title: seoFaqTicketRefund.title[lng],
    description: seoFaqTicketRefund.description[lng],
    keywords: seoFaqTicketRefund.keywords[lng],
  };
}

export default function TicketRefund() {
  return <FaqPage />;
}
