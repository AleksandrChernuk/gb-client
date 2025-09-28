'use client';

import { useSearchStore } from '@/shared/store/useSearch';
import { useLocale } from 'next-intl';
import { useCitySearch } from '../model/useCitySearch';
import { useIsFetching } from '@tanstack/react-query';
import CitySearchDesktop from './CitySearchDesktop';
import CitySearchMobile from './CitySearchMobile';
import { useCityData } from '@/features/route-search-form/model/useCityData';

type Props = {
  name: 'from' | 'to';
  variant: 'mobile' | 'desktop';
};

export default function CitySearch({ name, variant }: Props) {
  const swap = useSearchStore((state) => state.swap);
  const isFetchingLocations = useIsFetching({ queryKey: ['locations'] });

  const { fromCity, toCity } = useCityData();

  const city = name === 'from' ? fromCity : toCity;

  const errors = useSearchStore((state) => state.errors[name]);
  const setErrorsRaw = useSearchStore((state) => state.setErrors);

  const locale = useLocale();

  const search = useCitySearch({
    name,
  });

  const commonProps = {
    name,
    city: city,
    errors,
    setErrors: setErrorsRaw,
    swap,
    isFetchingLocations,
    locale,
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
