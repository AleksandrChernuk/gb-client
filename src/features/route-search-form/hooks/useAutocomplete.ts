'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchLocations } from '../api/location.api';
import { useCityData } from './useCityData';
import { ILocation } from '@/shared/types/location.types';
import useSearchRouteParams from '@/features/route-search-form/hooks/useCitySearch';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import { useLocale } from 'next-intl';

type Tname = 'from' | 'to';

type Props = {
  name: Tname;
};

export function useAutocomplete({ name }: Props) {
  const locale = useLocale();
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const [debouncedQuery] = useDebounce(inputValue, 300);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    set: { setFrom, setTo },
  } = useSearchRouteParams();

  const placeholder = useMemo(() => {
    return name === 'from' ? 'Звідки' : 'Куди';
  }, [name]);

  const { fromCity, toCity } = useCityData();
  const city = name === 'from' ? fromCity : toCity;

  const { data: cities = [], isFetching: isLoading } = useQuery({
    queryKey: ['locations', debouncedQuery],
    queryFn: () => fetchLocations(debouncedQuery.trim()),
    enabled: debouncedQuery.trim().length > 0,
    staleTime: 1000 * 60 * 5,
  });

  const updateCityValue = useCallback((selectedCity: ILocation) => {
    setInputValue(extractLocationDetails(selectedCity, locale).locationName);
  }, [locale]);

  const queryClient = useQueryClient();

  const onSelectCity = useCallback(
    (newCity: ILocation) => {
      const cityIndex = cities.findIndex((el) => el.id === newCity.id);
      setHighlightedIndex(cityIndex >= 0 ? cityIndex : -1);
      updateCityValue(newCity);

      setOpen(false);
      inputRef.current?.blur();

      queryClient.setQueryData(['location', String(newCity.id)], newCity);

      setTimeout(() => {
        const set = name === 'from' ? setFrom : setTo;
        set(String(newCity.id));
      }, 50);
    },
    [cities, name, setFrom, setTo, updateCityValue, queryClient],
  );

  const handleBlur = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    setOpen(false);
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!cities || cities.length === 0) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setHighlightedIndex((prevIndex) => (prevIndex < cities.length - 1 ? prevIndex + 1 : prevIndex));
          break;
        case 'ArrowUp':
          event.preventDefault();
          setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
          break;
        case 'Enter':
          event.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < cities.length) {
            onSelectCity(cities[highlightedIndex]);
          }
          break;
        case 'Escape':
          event.preventDefault();
          setOpen(false);
          inputRef.current?.blur();
          break;
      }
    },
    [cities, highlightedIndex, onSelectCity],
  );

  const clearParam = useCallback(() => {
    const set = name === 'from' ? setFrom : setTo;
    set('');
  }, [name, setFrom, setTo]);

  const onInputChange = (newValue: string) => {
    setInputValue(newValue);
    setHighlightedIndex(-1);
    // If user manually edits the field, deselect the city in URL
    clearParam();
    if (!open) setOpen(true);
  };

  const handleClearMobileInput = () => {
    setInputValue('');
    setHighlightedIndex(-1);
    clearParam();
  };

  const handleToggleOpen = () => setOpen((p) => !p);

  useEffect(() => {
    if (city) {
      updateCityValue(city);
    } else {
      setInputValue('');
    }
  }, [city, updateCityValue]);

  useEffect(() => {
    if (!open && inputValue.trim().length === 0 && city) {
      updateCityValue(city);
    }
  }, [open, inputValue, city, updateCityValue]);

  useEffect(() => {
    if (highlightedIndex >= cities.length) {
      setHighlightedIndex(-1);
    }
  }, [cities.length, highlightedIndex]);

  return {
    open,
    setOpen,
    handleToggleOpen,
    cities,
    highlightedIndex,
    onSelectCity,
    inputRef,
    onKeyDown,
    onInputChange,
    handleBlur,
    value: inputValue,
    handleClearMobileInput,
    placeholder,
    isLoading,
  };
}
