"use client";

import { Loader } from './components/Loader';
import { NoTravel } from './components/NoTravel';
import useSearchResult from '../../hooks/useSearchResult';
import { useRoutesStore } from '@/store/useRouter';
import RoutersList from './components/RoutersList';
import { ErrorTravel } from './components/ErrorTravel';

export const ResultList = () => {
  const { isFetching, error, data } = useSearchResult();

  const filteredRoutes = useRoutesStore((state) => state.filteredRoutes);

  if (isFetching) {
    return <Loader />;
  }

  if (error) return <ErrorTravel />;

  if (!isFetching && data && !data.length) return <NoTravel />;

  return <RoutersList routersList={filteredRoutes} />;
};
