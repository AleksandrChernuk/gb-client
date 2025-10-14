'use client';

import { useIsFetching } from '@tanstack/react-query';
import CitySearchDesktop from './CitySearchDesktop';
import CitySearchMobile from './CitySearchMobile';
import { useCityData } from '@/features/route-search-form/hooks/useCityData';
import { useCitySearch } from '@/features/route-search-form/hooks/useCitySearch';
import { useRouterSearch } from '@/shared/hooks/useRouterSearch';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  name: 'from' | 'to';
  variant: 'mobile' | 'desktop';
  error: string | null | undefined;
  resetError: () => void;
  setErrorsRaw: Dispatch<
    SetStateAction<{
      from?: string | null;
      to?: string | null;
    }>
  >;
};

export default function CitySearch({ name, variant, error, resetError, setErrorsRaw }: Props) {
  const [, actions] = useRouterSearch();

  const isFetchingLocations = useIsFetching({ queryKey: ['locations'] });

  const { fromCity, toCity } = useCityData();

  const city = name === 'from' ? fromCity : toCity;

  const search = useCitySearch({
    name,
  });

  const commonProps = {
    name,
    city: city,
    errors: error,
    setErrors: setErrorsRaw,
    swap: actions.swap,
    isFetchingLocations: !!isFetchingLocations,
    resetError,
    ...search,
  };

  switch (variant) {
    case 'desktop':
      return <CitySearchDesktop {...commonProps} />;
    case 'mobile':
      return <CitySearchMobile {...commonProps} />;
    default:
      return null;
  }
}
