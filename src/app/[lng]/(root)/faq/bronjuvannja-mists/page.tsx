import { seoFaqBooking } from '@/lib/seo';
import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import FaqTabs from '../_modules/FaqTabs';

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

export default async function BronjuvannjaMists({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);
  return <FaqTabs />;
}
