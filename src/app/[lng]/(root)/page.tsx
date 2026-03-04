import { Params } from '@/shared/types/common.types';
import { Locale } from 'next-intl';
import MainFooter from '@/widgets/footer/MainFooter';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { generatePublicPageMetadata } from '@/shared/lib/metadata';
import { HeroSection } from '@/views/home-page/HeroSection';
import { ArticlesPreviewSection } from '@/views/home-page/ArticlesPreviewSection';
import { AllCountriesSection } from '@/views/home-page/AllCountriesSection';
import { BenefitsSection } from '@/views/home-page/BenefitsSection';
import { PopularRoutesSection } from '@/views/home-page/PopularRoutesSection';
import { QuestionsSection } from '@/views/home-page/QuestionsSection';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  return await generatePublicPageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'main',
  });
}

export default async function Home() {
  return (
    <>
      <main role="main" className="bg-slate-50 dark:bg-slate-900">
        <HeroSection />
        <BenefitsSection />
        <AllCountriesSection />
        <PopularRoutesSection />
        <ArticlesPreviewSection />
        <QuestionsSection />
      </main>
      <MainFooter />
    </>
  );
}
