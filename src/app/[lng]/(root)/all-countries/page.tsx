import MainSearch from '@/features/route-search-form';
import { getLocations } from '@/shared/api/location.actions';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { generatePublicPageMetadata } from '@/shared/lib/metadata';
import { Params, TParams } from '@/shared/types/common.types';
import { Container } from '@/shared/ui/Container';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ILocation } from '@/shared/types/location.types';
import { mapCountries } from '@/shared/lib/mapCountries';
import MainFooter from '@/widgets/footer/MainFooter';
import { BreadcrumbSimple } from '@/shared/ui/BreadcrumbSimple';
import { notFound } from 'next/navigation';
import { CitySearch, CountriesList, GroupedCitiesListClient } from '@/features/all-countries';

export interface ICountryListItem {
  slug: string;
  name: string;
  countryId: number;
}

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

  const data = await getLocations({ query: '', perPage: 1000 });

  if (!data) {
    notFound();
  }

  const locations: ILocation[] = data.data;
  const countries = mapCountries(locations, lng);
  const t = await getTranslations({ locale: lng as Locale, namespace: MESSAGE_FILES.ALL_COUNTRIES });

  return (
    <>
      <main className="bg-slate-50 dark:bg-slate-800 flex-1">
        <section className="bg-green-500 dark:bg-slate-900">
          <Container size="l" className="py-5">
            <div className="mb-4">
              <BreadcrumbSimple items={[{ label: t('breadcrumbs_home'), href: '/' }]} />
            </div>
            <MainSearch />
          </Container>
        </section>

        <section className="pt-10">
          <Container size="m">
            <h1 className="mb-4 text-xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
              {t('meet_buses_in_your_city')}
            </h1>

            <CountriesList countries={countries} locale={lng} />
          </Container>
        </section>

        <section className="pt-8 pb-4">
          <Container size="m">
            <h2 className="mb-1 text-lg font-bold tracking-normal leading-[28.8px] laptop:text-[28px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
              {t('select_departure_country')}
            </h2>
            <CitySearch />
          </Container>
        </section>

        <section>
          <Container size="m">
            <GroupedCitiesListClient initialLocations={locations} locale={lng} />
          </Container>
        </section>
      </main>
      <MainFooter />
    </>
  );
}
