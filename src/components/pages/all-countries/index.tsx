import { getLocations } from '@/actions/location.actions';
import { Container } from '@/components/shared/Container';
import React from 'react';
import CountriesList from './components/CountriesList';
import MainSearch from '@/components/modules/main-search';
import BackRouteButton from '@/components/shared/BackRouteButton';
import { AllCountriesProvider } from './context';
import { getLocale } from 'next-intl/server';
import CityList from './components/CityList';

export default async function AllCountriesPage() {
  const data = await getLocations({ query: '', perPage: 99 });
  const locale = await getLocale();
  return (
    <main className="bg-slate-50 dark:bg-slate-800 flex-1 py-8">
      <AllCountriesProvider locations={data.data} locale={locale}>
        <section className="bg-green-500 dark:bg-slate-900">
          <Container size="l" className="py-5">
            <h1 className="sr-only">Select a country</h1>
            <div className="mb-4">
              <BackRouteButton className="text-white" />
            </div>
            <MainSearch />
          </Container>
        </section>
        <section className="py-10">
          <Container size="m">
            <h2 className="mb-2 text-slate-700 dark:text-slate-50">Select a country</h2>
            <CountriesList />
          </Container>
        </section>

        <section className="pb-8">
          <Container size="m">
            <h2 className="mb-4 text-slate-700 dark:text-slate-50">Select a city</h2>
            <CityList />
          </Container>
        </section>
      </AllCountriesProvider>
    </main>
  );
}
