import { seoFaqSearch } from '@/lib/seo';
import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import FaqSeach from '../_modules/FaqSeach';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: 'uk' | 'ru' | 'en' };

  return {
    title: seoFaqSearch.title[lng],
    description: seoFaqSearch.description[lng],
    keywords: seoFaqSearch.keywords[lng],
  };
}

export default async function FaqSlug({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);
  return <FaqSeach />;
}
