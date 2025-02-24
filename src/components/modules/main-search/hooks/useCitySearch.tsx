'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ILocation } from '@/types/location.types'
import useDebounce from './useDebounce'
import { useLocationsQuery } from './useLocationsQuery'
import { useSearchStore } from '@/store/useSearch'
import { useLocale, useTranslations } from 'next-intl'
import { extractLocationDetails } from '@/lib/extractLocationDetails'

type Tname = 'from' | 'to'

type Props = {
  name: Tname
}

export const useCitySearch = ({ name }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const { debouncedValue } = useDebounce(value)
  const { cities, loading } = useLocationsQuery(debouncedValue)
  const city = useSearchStore((state) => state[name])
  const setCity = useSearchStore((state) => state.setCity)
  const language = useLocale()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const t = useTranslations('common')

  const onSelectCity = useCallback(
    (newCity: ILocation) => {
      setCity(name, newCity)
      const cityIndex = cities?.findIndex((el) => el.id === newCity.id) || 0
      setHighlightedIndex(cityIndex)
      setValue('')
      setOpen(false)
      inputRef.current?.blur()
    },
    [setCity, name, cities]
  )

  const handleBlur = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setValue('')
      setOpen(false)
    }
  }, [])

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (cities) {
        if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
          const step = event.key === 'ArrowDown' ? 1 : -1
          setHighlightedIndex((prevIndex) =>
            Math.min(Math.max(prevIndex + step, 0), cities.length - 1)
          )
        }

        if (event.key === 'Enter' && cities[highlightedIndex]) {
          onSelectCity(cities[highlightedIndex])
        }
      }
    },
    [cities, highlightedIndex, onSelectCity]
  )

  const onInputChange = useCallback((newValue: string) => {
    setValue(newValue)
  }, [])

  const handleClearMobileInput = useCallback(() => {
    setValue('')
  }, [])

  useEffect(() => {
    const cityIndex = cities?.findIndex((el) => el.id === city?.id) || 0
    setHighlightedIndex(cityIndex)
  }, [city, cities])

  const getPlaceholder = useCallback(() => {
    const locationName = city ? extractLocationDetails(city, language).locationName : null
    return locationName || (name === 'from' ? t('placeholderFrom') : t('placeholderTo'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, language, name])

  const handleToggleOpen = useCallback(() => {
    setOpen((p) => !p)
    if (!open) {
      setValue('')
    }
  }, [open])

  return {
    open,
    handleToggleOpen,
    cities,
    loading,
    highlightedIndex,
    debouncedValue,
    onSelectCity,
    inputRef,
    onKeyDown,
    onInputChange,
    handleBlur,
    value,
    handleClearMobileInput,
    placeholder: getPlaceholder(),
  }
}
