'use client';

import { useCallback, useEffect, useMemo, useRef, useState, useDeferredValue } from 'react';
import { ILocation } from '@/shared/types/location.types';
import { useSearchStore } from '@/shared/store/useSearch';
import { useLocale, useTranslations } from 'next-intl';
import { useShallow } from 'zustand/react/shallow';
import { useLocationsStore } from '@/shared/store/useLocations';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import { useCityData } from '@/features/route-search-form/model/useCityData';

type Tname = 'from' | 'to';

type Props = {
  name: Tname;
};

export const useCitySearch = ({ name }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const deferredInputValue = useDeferredValue(inputValue);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const locations = useLocationsStore((state) => state.locations);
  const favoriteLocations = useLocationsStore(useShallow((state) => state.favoriteLocations));

  const setCityId = useSearchStore((state) => state.setCityId);

  const { fromCity, toCity } = useCityData();
  const city = name === 'from' ? fromCity : toCity;

  const language = useLocale();
  const t = useTranslations(MESSAGE_FILES.COMMON);

  const placeholder = useMemo(() => {
    return name === 'from' ? t('placeholderFrom') : t('placeholderTo');
  }, [name, t]);

  const cities = useMemo(() => {
    if (deferredInputValue.trim().length === 0) {
      return favoriteLocations || [];
    }

    const query = deferredInputValue.trim().toLowerCase();
    return (locations || []).filter((loc) => {
      const { locationName } = extractLocationDetails(loc, language);
      return locationName.toLowerCase().startsWith(query);
    });
  }, [deferredInputValue, locations, favoriteLocations, language]);

  const updateCityValue = useCallback(
    (selectedCity: ILocation) => {
      setInputValue(extractLocationDetails(selectedCity, language).locationName);
    },
    [language],
  );

  const onSelectCity = useCallback(
    (newCity: ILocation) => {
      setCityId(name, newCity.id);
      const cityIndex = cities.findIndex((el) => el.id === newCity.id);
      setHighlightedIndex(cityIndex >= 0 ? cityIndex : -1);
      updateCityValue(newCity);
      setOpen(false);
      inputRef.current?.blur();
    },
    [setCityId, name, cities, updateCityValue],
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

  const onInputChange = (newValue: string) => {
    setInputValue(newValue);
    setHighlightedIndex(-1);
    if (!open) setOpen(true);
  };

  const handleClearMobileInput = () => {
    setInputValue('');
    setHighlightedIndex(-1);
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
  };
};
