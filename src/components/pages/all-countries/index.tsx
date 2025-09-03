import { getLocations } from '@/actions/location.actions';
import { Container } from '@/components/shared/Container';
import React from 'react';
import CountriesList from './components/CountriesList';
import MainSearch from '@/components/modules/main-search';
import BackRouteButton from '@/components/shared/BackRouteButton';
import { AllCountriesProvider } from './context';
import { getLocale, getTranslations } from 'next-intl/server';
import CityList from './components/CityList';
import { MESSAGE_FILES } from '@/config/message.file.constans';

export default async function AllCountriesPage() {
  const data = await getLocations({ query: '', perPage: 99 });
  const locale = await getLocale();
  const t = await getTranslations(MESSAGE_FILES.ALL_COUNTRIES);

  return (
    <main className="bg-slate-50 dark:bg-slate-800 flex-1">
      <AllCountriesProvider locations={data.data} locale={locale}>
        <section className="bg-green-500 dark:bg-slate-900">
          <Container size="l" className="py-5">
            <div className="mb-4">
              <BackRouteButton className="text-white" />
            </div>
            <MainSearch />
          </Container>
        </section>

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
