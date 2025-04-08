import ThirdFooter from '@/components/modules/footer/ThirdFooter';
import AboutPage from '@/components/pages/about';
import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default async function About({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);

  return (
    <>
      <AboutPage />
      <ThirdFooter />
    </>
  );
}
