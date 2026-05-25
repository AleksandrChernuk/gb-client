export const revalidate = 86400;

import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { generatePublicPageMetadata } from '@/shared/lib/metadata';
import { Params, TParams } from '@/shared/types/common.types';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import MainFooter from '@/widgets/footer/MainFooter';
import { notFound } from 'next/navigation';
import { CountriesListSection } from '@/views/all-countries-page/CountriesListSection';
import { getAllCountries } from '@/shared/api/countries.actions';
import { СountriesSearchHero } from '@/views/all-countries-page/СountriesSearchHero';
import { SeoSectionAllCountries } from '@/views/all-countries-page/SeoSection';

export async function generateMetadata({ params }: TParams) {
  const { lng } = (await params) as { lng: Locale };
  const baseMetadata = await generatePublicPageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'all-countries',
    path: 'all-countries/',
  });

  return {
    ...baseMetadata,
  };
}

export default async function AllCountries({
  params,
}: Readonly<{
  params: Promise<Params>;
}>) {
  const { lng } = (await params) as { lng: Locale };

  setRequestLocale(lng);

  const countries = await getAllCountries();

  if (!countries) {
    notFound();
  }

  return (
    <>
      <main className="bg-slate-50 dark:bg-slate-800 flex-1">
        <СountriesSearchHero />
        <CountriesListSection countries={countries} locale={lng} />
        <SeoSectionAllCountries />
      </main>

      <MainFooter />
    </>
  );
}
