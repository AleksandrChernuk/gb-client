import SlugPage from '@/components/pages/faq/modules/FaqSearchResult';
import { seoFaqSearch } from '@/lib/seo';
import { Params } from '@/types/common.types';

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

export default async function FaqSlug() {
  return <SlugPage />;
}
