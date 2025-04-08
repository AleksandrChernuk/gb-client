import FaqPage from '@/components/pages/faq';
import { seoFaqTicketRefund } from '@/lib/seo';
import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

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

export default async function TicketRefund({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);
  return <FaqPage />;
}
