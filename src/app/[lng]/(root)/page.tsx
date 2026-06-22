export const revalidate = 3600;

import { Params } from '@/shared/types/common.types';
import { Locale } from 'next-intl';
import MainFooter from '@/widgets/footer/MainFooter';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { generatePublicPageMetadata } from '@/shared/lib/metadata';
import { HeroSection } from '@/views/home-page/HeroSection';
import { ArticlesPreviewSection } from '@/views/home-page/ArticlesPreviewSection';
import { PopularRoutesSkeleton } from '@/views/home-page/PopularRoutesSection/PopularRoutesSkeleton';
import { ArticlesSkeleton } from '@/views/home-page/ArticlesPreviewSection/ArticlesSkeleton';
import { Container } from '@/shared/ui/Container';
import { H2 } from '@/shared/ui/H2';
import { AllCountriesSection } from '@/views/home-page/AllCountriesSection';
import { BenefitsSection } from '@/views/home-page/BenefitsSection';
import { PopularRoutesSection } from '@/views/home-page/PopularRoutesSection';
import { QuestionsSection } from '@/views/home-page/QuestionsSection';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SeoTextSection } from '@/views/home-page/SeoTextSection';
import { Suspense } from 'react';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  return await generatePublicPageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'main',
    path: '',
  });
}

export default async function Home({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);

  const t = await getTranslations(MESSAGE_FILES.COMMON);

  return (
    <>
      <main role="main" className="bg-slate-50 dark:bg-slate-900">
        <HeroSection />
        <BenefitsSection />
        <Suspense
          fallback={
            <section className="py-6">
              <Container size="m">
                <PopularRoutesSkeleton />
              </Container>
            </section>
          }
        >
          <PopularRoutesSection />
        </Suspense>
        <AllCountriesSection />
        <Suspense
          fallback={
            <section className="py-8 tablet:py-16">
              <Container size="m">
                <H2>{t('articles_title')}</H2>
                <ArticlesSkeleton />
                <div className="text-right">
                  <div className="inline-block h-10 w-32 rounded-md bg-slate-200 dark:bg-slate-700 animate-pulse" />
                </div>
              </Container>
            </section>
          }
        >
          <ArticlesPreviewSection />
        </Suspense>
        <QuestionsSection />
        <SeoTextSection />
      </main>
      <MainFooter />
    </>
  );
}
