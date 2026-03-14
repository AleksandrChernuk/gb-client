export const dynamic = 'force-dynamic';

import { getLocations } from '@/shared/api/location.actions';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { generatePublicPageMetadata } from '@/shared/lib/metadata';
import { Params, TParams } from '@/shared/types/common.types';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { ILocation } from '@/shared/types/location.types';
import MainFooter from '@/widgets/footer/MainFooter';
import { notFound } from 'next/navigation';
import { CountriesListSection } from '@/views/all-countries-page/CountriesListSection';
import { getAllCountries } from '@/shared/api/countries.actions';
import { CitySearchSection } from '@/views/all-countries-page/CitySearchSection';
import { GroupedCitiesSection } from '@/views/all-countries-page/GroupedCitiesSection';
import { СountriesSearchHero } from '@/views/all-countries-page/СountriesSearchHero';

export async function generateMetadata({ params }: TParams) {
  const { lng } = (await params) as { lng: Locale };
  return await generatePublicPageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'all-countries',
    path: 'all-countries',
  });
}

export default async function AllCountries({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);

  const [locationsData, countries] = await Promise.all([getLocations({ query: '', perPage: 1000 }), getAllCountries()]);

  if (!locationsData || !countries) {
    notFound();
  }

  const locations: ILocation[] = locationsData.data;

  return (
    <>
      <main className="bg-slate-50 dark:bg-slate-800 flex-1">
        <СountriesSearchHero />
        <CountriesListSection countries={countries} locale={lng} />

        <CitySearchSection />
        <GroupedCitiesSection locations={locations} locale={lng} />
      </main>
      <MainFooter />
    </>
  );
}
