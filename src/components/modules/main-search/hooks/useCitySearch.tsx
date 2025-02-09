"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ILocation } from "@/types/location.types";
import { LoaderCity } from "../components/CitySearch/LoaderCity";
import { CityItem } from "../components/CitySearch/CityItem";
import { extractLocationDetails } from "@/lib/extractLocationDetails";
import { NotFoundCity } from "../components/CitySearch/NotFoundCity";
import useDebounce from "./useDebounce";
import { useLocationsQuery } from './useLocationsQuery';
import { useTranslation } from 'react-i18next';
import useToggleOpen from '@/hooks/useToggleOpen';
import { useSearchStore } from '@/store/useSearch';

type Tname = 'from' | 'to';

type Props = {
  name: Tname;
};

export const useCitySearch = ({ name }: Props) => {
  const { open, handleSetOpen, handleToggleOpen } = useToggleOpen();

  const city = useSearchStore((state) => state[name]);
  const setCity = useSearchStore((state) => state.setCity);

  const {
    i18n: { language },
  } = useTranslation();

  const [value, setValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { debouncedValue } = useDebounce(value);
  const { cities, loading } = useLocationsQuery(debouncedValue);

  const onSelectCity = useCallback(
    (newCity: ILocation) => {
      setCity(name, newCity);
      const cityIndex = cities?.findIndex((el) => el.id === newCity.id) || 0;
      setHighlightedIndex(cityIndex);
      setValue('');
      handleSetOpen(false);
      inputRef.current?.blur();
    },
    [setCity, name, cities, handleSetOpen]
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        setValue('');
        handleSetOpen(false);
      }
    },
    [handleSetOpen]
  );

  const handleCloseDrawer = useCallback(() => {
    setValue('');
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (cities) {
        if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
          const step = event.key === 'ArrowDown' ? 1 : -1;
          setHighlightedIndex((prevIndex) =>
            Math.min(Math.max(prevIndex + step, 0), cities.length - 1)
          );
        }

        if (event.key === 'Enter' && cities[highlightedIndex]) {
          onSelectCity(cities[highlightedIndex]);
        }
      }
    },
    [cities, highlightedIndex, onSelectCity]
  );

  const onInputChange = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  const handleClearMobileInput = useCallback(() => {
    setValue('');
  }, []);

  useEffect(() => {
    const cityIndex = cities?.findIndex((el) => el.id === city?.id) || 0;
    setHighlightedIndex(cityIndex);
  }, [city, cities]);

  const list = useMemo(
    () => (
      <>
        {!loading &&
          cities &&
          cities.map((el, index) => {
            const element = extractLocationDetails(el, language);
            return (
              <div key={el.id}>
                <CityItem
                  key={el.id}
                  el={element}
                  isSelected={city?.id === el.id}
                  isHighlighted={highlightedIndex === index}
                  handleSelectCity={() => onSelectCity(el)}
                />
              </div>
            );
          })}
        {!loading && !cities.length && <NotFoundCity />}
        {loading && <LoaderCity />}
      </>
    ),
    [cities, city?.id, highlightedIndex, language, loading, onSelectCity]
  );

  const getPlaceholder = useCallback(() => {
    const locationName = city ? extractLocationDetails(city, language).locationName : null;
    return locationName || (name === 'from' ? 'Звідки' : 'Куди');
  }, [city, language, name]);

  return {
    open,
    highlightedIndex,
    debouncedValue,
    onSelectCity,
    inputRef,
    onKeyDown,
    handleToggleOpen,
    onInputChange,
    handleBlur,
    value,
    handleClearMobileInput,
    handleCloseDrawer,
    list,
    placeholder: getPlaceholder(),
  };
};
