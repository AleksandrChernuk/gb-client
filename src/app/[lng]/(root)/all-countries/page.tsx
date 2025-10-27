import { AllCountriesProvider } from '@/features/all-countries/model/AllCountriesProvider';
import MainSearch from '@/features/route-search-form';
import { getLocations } from '@/shared/api/location.actions';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { generatePublicPageMetadata } from '@/shared/lib/metadata';
import { Params } from '@/shared/types/common.types';
import BackRouteButton from '@/shared/ui/BackRouteButton';
import { Container } from '@/shared/ui/Container';
import { CityList, CountriesList } from '@/widgets/all-counries-list';

import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
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
  const data = await getLocations({ query: '', perPage: 500 });
  const t = await getTranslations(MESSAGE_FILES.ALL_COUNTRIES);
  return (
    <main className="bg-slate-50 dark:bg-slate-800 flex-1">
      <section className="bg-green-500 dark:bg-slate-900">
        <Container size="l" className="py-5">
          <div className="mb-4">
            <BackRouteButton className="text-white" />
          </div>
          <MainSearch />
        </Container>
      </section>
      <AllCountriesProvider locations={data.data} locale={lng}>
        <section className="py-10">
          <Container size="m">
            <h1 className="mb-4 text-xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
              {t('select_country')}
            </h1>
            <CountriesList />
          </Container>
        </section>

        <section className="pb-8">
          <Container size="m">
            <h2 className="mb-4 text-slate-700 dark:text-slate-50">{t('select_city')}</h2>

            <CityList />
          </Container>
        </section>
      </AllCountriesProvider>
    </main>
  );
}
