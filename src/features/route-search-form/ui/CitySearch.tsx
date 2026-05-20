'use client';

import { useIsFetching } from '@tanstack/react-query';
import CitySearchDesktop from './CitySearchDesktop';
import CitySearchMobile from './CitySearchMobile';
import { useCityData } from '@/features/route-search-form/hooks/useCityData';
import { useRouterSearch } from '@/shared/hooks/useRouterSearch';
import { Dispatch, SetStateAction } from 'react';
import { useAutocomplete } from '@/features/route-search-form/hooks/useAutocomplete';

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
  const autocomplete = useAutocomplete({ name });

  const [, actions] = useRouterSearch();

  const isFetchingLocations = useIsFetching({ queryKey: ['locations'] });

  const { fromCity, toCity } = useCityData();
  const city = name === 'from' ? fromCity : toCity;

  const commonProps = {
    name,
    city,
    errors: error,
    setErrors: setErrorsRaw,
    swap: actions.swap,
    isFetchingLocations: !!isFetchingLocations,
    resetError,
    // все з useAutocomplete
    open: autocomplete.open,
    value: autocomplete.value,
    inputRef: autocomplete.inputRef,
    cities: autocomplete.cities,
    highlightedIndex: autocomplete.highlightedIndex,
    placeholder: autocomplete.placeholder,
    onInputChange: autocomplete.onInputChange,
    onKeyDown: autocomplete.onKeyDown,
    onSelectCity: autocomplete.onSelectCity,
    handleBlur: autocomplete.handleBlur,
    handleToggleOpen: autocomplete.handleToggleOpen,
    handleClearMobileInput: autocomplete.handleClearMobileInput,
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