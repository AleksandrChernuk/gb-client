// 'use client';

// import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { ILocation } from '@/types/location.types';
// import { useSearchStore } from '@/store/useSearch';
// import { useLocale, useTranslations } from 'next-intl';
// import { extractLocationDetails } from '@/lib/extractLocationDetails';
// import { MESSAGE_FILES } from '@/constans/message.file.constans';
// import { useShallow } from 'zustand/react/shallow';
// import { useFavoriteLocations, useLocations } from '@/hooks/useLocations';
// import { useSearchParams } from 'next/navigation';
// import { getLocationById } from '@/actions/location.actions';
// import { useUpdateSearchParams } from '@/lib/useUpdateSearchParams';
// import useDebounce from '@/hooks/useDebounce';

// type Tname = 'from' | 'to';

// type Props = {
//   name: Tname;
// };

// export const useCitySearch = ({ name }: Props) => {
//   const [open, setOpen] = useState<boolean>(false);
//   const [value, setValue] = useState('');
//   const { debouncedValue } = useDebounce(value);

//   const [highlightedIndex, setHighlightedIndex] = useState(-1);
//   const searchParams = useSearchParams();
//   const initializedFromParams = useRef(false);

//   const { setParam } = useUpdateSearchParams();

//   const setCity = useSearchStore((state) => state.setCity);
//   const city = useSearchStore(useShallow((state) => state[name]));

//   const language = useLocale();
//   const t = useTranslations(MESSAGE_FILES.COMMON);
//   const isSearching = debouncedValue.length > 1;

//   const { data: searchResults } = useLocations(isSearching ? debouncedValue : '', { enabled: isSearching });
//   const { data: favoriteLocations } = useFavoriteLocations();

//   const inputRef = useRef<HTMLInputElement | null>(null);

//   const cities = useMemo(() => {
//     if (city) {
//       return [city];
//     }

//     if (debouncedValue.trim().length > 1) {
//       return searchResults || [];
//     }

//     return favoriteLocations || [];
//   }, [city, debouncedValue, searchResults, favoriteLocations]);

//   const onSelectCity = useCallback(
//     (newCity: ILocation) => {
//       setCity(name, newCity);
//       setParam(name, String(newCity.id));

//       const cityIndex = cities?.findIndex((el) => el.id === newCity.id) || 0;
//       setHighlightedIndex(cityIndex);

//       setValue(extractLocationDetails(newCity, language).locationName);

//       setOpen(false);
//       inputRef.current?.blur();
//     },
//     [setCity, name, setParam, cities, language],
//   );

//   useEffect(() => {
//     if (city) {
//       setValue(extractLocationDetails(city, language).locationName);
//     } else {
//       setValue('');
//     }
//   }, [city, language]);

//   useEffect(() => {
//     const loadFromParams = async () => {
//       if (initializedFromParams.current) return;
//       initializedFromParams.current = true;

//       const paramId = searchParams.get(name);
//       const id = paramId ? Number(paramId) : null;

//       if (!id || isNaN(id)) return;
//       if (city) return;

//       try {
//         const location = await getLocationById(id);
//         if (location) {
//           setCity(name, location);
//         } else {
//           setCity(name, null);
//         }
//       } catch (error) {
//         console.error(`Failed to load city with id=${id}`, error);
//       }
//     };

//     loadFromParams();
//   }, [city, name, searchParams, setCity]);

//   const handleBlur = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
//     if (!event.currentTarget.contains(event.relatedTarget)) {
//       setOpen(false);
//     }
//   }, []);

//   const onKeyDown = useCallback(
//     (event: React.KeyboardEvent<HTMLInputElement>) => {
//       if (!cities || cities.length === 0) return;

//       if (event.key === 'ArrowDown') {
//         event.preventDefault();
//         setHighlightedIndex((prevIndex) => Math.min(prevIndex + 1, cities.length - 1));
//       }
//       if (event.key === 'ArrowUp') {
//         event.preventDefault();
//         setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
//       }
//       if (event.key === 'Enter') {
//         event.preventDefault();
//         if (highlightedIndex >= 0 && highlightedIndex < cities.length) {
//           onSelectCity(cities[highlightedIndex]);
//         }
//       }
//     },
//     [cities, highlightedIndex, onSelectCity],
//   );

//   const onInputChange = useCallback(
//     (newValue: string) => {
//       setValue(newValue);
//       if (newValue.trim().length < 1) {
//         setCity(name, null);
//       }
//     },
//     [name, setCity],
//   );

//   const handleClearMobileInput = useCallback(() => {
//     setValue('');
//     setCity(name, null);
//   }, [name, setCity]);

//   useEffect(() => {
//     const cityIndex = cities?.findIndex((el) => el.id === city?.id) || 0;
//     setHighlightedIndex(cityIndex);
//   }, [city, cities]);

//   const getPlaceholder = useCallback(() => {
//     const locationName = city ? extractLocationDetails(city, language).locationName : null;
//     return locationName || (name === 'from' ? t('placeholderFrom') : t('placeholderTo'));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [city, language, name]);

//   const handleToggleOpen = useCallback(() => {
//     setOpen((p) => !p);
//     if (value.trim().length === 0 && city) {
//       setValue(extractLocationDetails(city, language).locationName);
//     }
//   }, [city, language, value]);

//   return {
//     open,
//     handleToggleOpen,
//     cities,
//     highlightedIndex,
//     onSelectCity,
//     inputRef,
//     onKeyDown,
//     onInputChange,
//     handleBlur,
//     value,
//     handleClearMobileInput,
//     placeholder: getPlaceholder(),
//   };
// };'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ILocation } from '@/types/location.types';
import { useSearchStore } from '@/store/useSearch';
import { useLocale, useTranslations } from 'next-intl';
import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { useShallow } from 'zustand/react/shallow';
import { useSearchParams } from 'next/navigation';
import { useUpdateSearchParams } from '@/lib/useUpdateSearchParams';
import { useLocations, useFavoriteLocations } from '@/hooks/useLocations';
import useDebounce from '@/hooks/useDebounce';
import { getLocationById } from '@/actions/location.actions';

type Tname = 'from' | 'to';

type Props = {
  name: Tname;
};

export const useCitySearch = ({ name }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchParams = useSearchParams();
  const initializedFromParams = useRef(false);
  const hasManuallyCleared = useRef(false);

  const { setParam } = useUpdateSearchParams();

  const setCity = useSearchStore((state) => state.setCity);
  const city = useSearchStore(useShallow((state) => state[name]));

  const language = useLocale();
  const t = useTranslations(MESSAGE_FILES.COMMON);

  const { debouncedValue } = useDebounce(value.trim());
  const isSearching = debouncedValue.length > 1;

  const { data: searchResults } = useLocations(debouncedValue, { enabled: isSearching });
  const { data: favoriteLocations } = useFavoriteLocations();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const cities = useMemo(() => {
    if (city) return [city];
    if (isSearching) return searchResults?.length ? searchResults : [];
    return favoriteLocations || [];
  }, [city, isSearching, searchResults, favoriteLocations]);

  const showNoResults = useMemo(() => {
    return isSearching && searchResults && searchResults.length === 0;
  }, [isSearching, searchResults]);

  const onSelectCity = useCallback(
    (newCity: ILocation) => {
      setCity(name, newCity);
      setParam(name, String(newCity.id));

      const cityIndex = cities?.findIndex((el) => el.id === newCity.id) || 0;
      setHighlightedIndex(cityIndex);

      setValue(extractLocationDetails(newCity, language).locationName);

      setOpen(false);
      inputRef.current?.blur();
    },
    [setCity, name, setParam, cities, language],
  );

  useEffect(() => {
    if (hasManuallyCleared.current) return;

    if (city) {
      setValue(extractLocationDetails(city, language).locationName);
    } else {
      setValue('');
    }
  }, [city, language]);

  useEffect(() => {
    const loadFromParams = async () => {
      if (initializedFromParams.current || city) return;

      const paramId = searchParams.get(name);
      const id = paramId ? Number(paramId) : null;

      if (!id) return;

      try {
        const location = await getLocationById(id);
        if (location) {
          setCity(name, location);
        } else {
          setCity(name, null);
        }
      } catch (error) {
        console.error(`Failed to load city with id=${id}`, error);
      } finally {
        initializedFromParams.current = true;
      }
    };

    loadFromParams();
  }, [city, name, searchParams, setCity]);

  const handleBlur = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpen(false);
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
      if (newValue.trim().length < 1) {
        setCity(name, null);
      }
    },
    [name, setCity],
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
    showNoResults,
  };
};
