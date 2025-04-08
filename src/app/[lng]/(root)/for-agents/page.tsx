import ThirdFooter from '@/components/modules/footer/ThirdFooter';
import ForAgentsPage from '@/components/pages/for-agents';
import { seoForAgents } from '@/lib/seo';
import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: 'uk' | 'ru' | 'en' };

  return {
    title: seoForAgents.title[lng],
    description: seoForAgents.description[lng],
    keywords: seoForAgents.keywords[lng],
  };
}

export default async function ForAgents({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);
  return (
    <>
      <ForAgentsPage />
      <ThirdFooter />
    </>
  );
}
