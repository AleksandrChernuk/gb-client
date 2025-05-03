import MainFooter from '@/components/modules/footer/MainFooter';
import BackRouteButton from '@/components/shared/BackRouteButton';
import { Container } from '@/components/shared/Container';
import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import FaqSeach from './_modules/FaqSeach';

export default async function FaqLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);
  const t = await getTranslations();
  return (
    <>
      <main role="main" className="pt-4 pb-20 tablet:pt-8 grow bg-slate-50 dark:bg-slate-900 ">
        <Container size="l">
          <div className="mb-4 ">
            <BackRouteButton />
          </div>
          <h1 className="text-center text-base font-bold leading-6 tracking-normal tablet:text-2xl tablet:leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
            {t('title')}
          </h1>
          <FaqSeach />
        </Container>

        {children}
      </main>
      <MainFooter className="bg-white dark:bg-slate-800" />
    </>
  );
}
