'use client';

import { useCallback, useEffect, useMemo, useRef, useState, useDeferredValue } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import { ILocation } from '@/shared/types/location.types';
import { getLocations } from '@/shared/api/location.actions';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import { useRouterSearch } from '@/shared/hooks/useRouterSearch';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

type Props = {
  name: 'from' | 'to';
  initialFavorites: ILocation[];
  initialCity: ILocation | null;
  resetError?: () => void;
};

export const useCityInput = ({ name, initialFavorites, initialCity, resetError }: Props) => {
  const locale = useLocale();
  const t = useTranslations(MESSAGE_FILES.COMMON);
  const [, actions] = useRouterSearch();

  const getDisplayName = useCallback((city: ILocation) => extractLocationDetails(city, locale).locationName, [locale]);

  const [open, setOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(() => !!initialCity);
  const [inputValue, setInputValue] = useState(() => (initialCity ? getDisplayName(initialCity) : ''));
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement | null>(null);
  // true = закрытие инициировано выбором города, не нужно восстанавливать значение
  const skipRestoreRef = useRef(false);

  const deferredInput = useDeferredValue(inputValue);
  const isSearching = !isSelected && deferredInput.trim().length >= 2;

  const { data: searchResults, isFetching } = useQuery({
    queryKey: ['locations', 'search', deferredInput],
    queryFn: () => getLocations({ query: deferredInput.trim(), perPage: 20 }),
    enabled: isSearching,
    staleTime: 5 * 60 * 1000,
  });

  const cities = useMemo(() => {
    if (!isSearching) return initialFavorites;
    return searchResults?.data ?? [];
  }, [isSearching, searchResults, initialFavorites]);

  const placeholder = name === 'from' ? t('placeholderFrom') : t('placeholderTo');

  // синк с URL — город изменился снаружи (swap, prefetch)
  useEffect(() => {
    if (initialCity) {
      setInputValue(getDisplayName(initialCity));
      setIsSelected(true);
    } else {
      setInputValue('');
      setIsSelected(false);
    }
  }, [initialCity, getDisplayName]);

  // закрылся дропдаун — восстановить значение если не был выбран город
  useEffect(() => {
    if (!open && initialCity) {
      if (skipRestoreRef.current) {
        skipRestoreRef.current = false;
        return;
      }
      setInputValue(getDisplayName(initialCity));
      setIsSelected(true);
    }
  }, [open, initialCity, getDisplayName]);

  useEffect(() => {
    if (highlightedIndex >= cities.length) setHighlightedIndex(-1);
  }, [cities.length, highlightedIndex]);

  const onSelectCity = useCallback(
    (city: ILocation) => {
      actions.setCityId(name, String(city.id));
      setInputValue(getDisplayName(city));
      setHighlightedIndex(cities.findIndex((c) => c.id === city.id));
      setIsSelected(true);
      skipRestoreRef.current = true; // не восстанавливать при закрытии
      setOpen(false);
    },
    [actions, name, cities, getDisplayName],
  );

  const onInputChange = useCallback((value: string) => {
    setInputValue(value);
    setIsSelected(false);
    setHighlightedIndex(-1);
    setOpen(true);
  }, []);

  // десктоп
  const handleBlurDesktop = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setOpen(false);
  }, []);

  const handleFocusDesktop = useCallback(() => {
    resetError?.();
    skipRestoreRef.current = true;
    setIsSelected(false);
    setOpen(true);
  }, [resetError]);

  const handleOpenChangeMobile = useCallback(
    (isOpen: boolean) => {
      if (isOpen) {
        resetError?.();
        setInputValue('');
        setIsSelected(false);
        setHighlightedIndex(-1);
        setOpen(true);
      } else {
        setOpen((prev) => {
          if (!prev) return prev;
          return false;
        });
      }
    },
    [resetError],
  );
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!cities.length) return;
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((i) => Math.min(i + 1, cities.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((i) => Math.max(i - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0) onSelectCity(cities[highlightedIndex]);
          break;
        case 'Escape':
          e.preventDefault();
          setOpen(false);
          inputRef.current?.blur();
          break;
      }
    },
    [cities, highlightedIndex, onSelectCity],
  );

  const handleClear = useCallback(() => {
    setInputValue('');
    setIsSelected(false);
    setHighlightedIndex(-1);
  }, []);

  return {
    open,
    cities,
    isFetching,
    isSearching,
    highlightedIndex,
    inputRef,
    inputValue,
    placeholder,
    onSelectCity,
    onInputChange,
    onKeyDown,
    handleBlurDesktop,
    handleFocusDesktop,
    handleOpenChangeMobile,
    handleClear,
  };
};
