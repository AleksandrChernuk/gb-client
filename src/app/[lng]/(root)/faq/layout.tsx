import MainFooter from '@/components/modules/footer/MainFooter';
import FaqSeach from '@/components/pages/FaqPage/modules/FaqSeach';
import BackRouteButton from '@/components/shared/BackRouteButton';
import { Container } from '@/components/shared/Container';
import { getTranslations } from 'next-intl/server';

export default async function FaqLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = await getTranslations('questions_answers');
  return (
    <>
      <main role="main" className="pt-4 pb-20 tablet:pt-8 grow bg-grayy dark:bg-dark_bg ">
        <Container size="l">
          <div className="mb-4 ">
            <BackRouteButton />
          </div>
          <h1 className="text-center h5 tablet:h3 laptop:h1 text-text_prymery">{t('title')}</h1>
          <FaqSeach />
        </Container>

        {children}
      </main>
      <MainFooter className="bg-white dark:bg-dark_main" />
    </>
  );
}
