'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ILocation } from '@/types/location.types';
import { useSearchStore } from '@/store/useSearch';
import { useLocale, useTranslations } from 'next-intl';
import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { useShallow } from 'zustand/react/shallow';
import { useLocations, useFavoriteLocations } from '@/hooks/useLocations';

type Tname = 'from' | 'to';

type Props = {
  name: Tname;
};

export const useCitySearch = ({ name }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const setCity = useSearchStore(useShallow((state) => state.setCity));
  const city = useSearchStore(useShallow((state) => state[name]));

  const language = useLocale();
  const t = useTranslations(MESSAGE_FILES.COMMON);

  const { data } = useLocations();
  const { data: favoriteLocations } = useFavoriteLocations();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const cities = useMemo(() => {
    if (city) return;

    if (value.trim().length === 0) {
      return favoriteLocations || [];
    }

    const query = value.trim().toLowerCase();
    return (data || []).filter((loc) => {
      const { locationName } = extractLocationDetails(loc, language);
      return locationName.toLowerCase().startsWith(query);
    });
  }, [city, value, data, favoriteLocations, language]);

  const onSelectCity = useCallback(
    (newCity: ILocation) => {
      setCity(name, newCity);
      const cityIndex = cities?.findIndex((el) => el.id === newCity.id) || 0;
      setHighlightedIndex(cityIndex);
      setValue(extractLocationDetails(newCity, language).locationName);
      setOpen(false);
      inputRef.current?.blur();
    },
    [setCity, name, cities, language],
  );

  const handleBlur = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpen(false);
      if (!city) {
        setValue('');
      }
    }
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!cities || cities.length === 0) return;

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setHighlightedIndex((prevIndex) => Math.min(prevIndex + 1, cities.length - 1));
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      }
      if (event.key === 'Enter') {
        event.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < cities.length) {
          onSelectCity(cities[highlightedIndex]);
        }
      }
    },
    [cities, highlightedIndex, onSelectCity],
  );

  const onInputChange = useCallback(
    (newValue: string) => {
      setValue(newValue);

      if (newValue.trim().length > 1 && city) {
        setCity(name, null);
      }

      if (newValue.trim().length === 0) {
        setCity(name, null);
      }
    },
    [city, name, setCity],
  );

  const handleClearMobileInput = useCallback(() => {
    setValue('');
    setCity(name, null);
  }, [name, setCity]);

  useEffect(() => {
    const cityIndex = cities?.findIndex((el) => el.id === city?.id) || 0;
    setHighlightedIndex(cityIndex);
  }, [city, cities]);

  const getPlaceholder = useCallback(() => {
    const locationName = city ? extractLocationDetails(city, language).locationName : null;
    return locationName || (name === 'from' ? t('placeholderFrom') : t('placeholderTo'));
  }, [city, language, name, t]);

  const handleToggleOpen = useCallback(() => {
    setOpen((p) => !p);
    if (value.trim().length === 0 && city) {
      setValue(extractLocationDetails(city, language).locationName);
    }
  }, [city, language, value]);

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
    value,
    handleClearMobileInput,
    placeholder: getPlaceholder(),
  };
};
