'use client';

import { useLocationsStore } from '@/shared/store/useLocations';
import { useSearchStore } from '@/shared/store/useSearch';
import { useMemo } from 'react';

export const useCityData = () => {
  const fromId = useSearchStore((state) => state.from);
  const toId = useSearchStore((state) => state.to);
  const locations = useLocationsStore((state) => state.locations);

  const fromCity = useMemo(() => locations?.find((loc) => loc.id === fromId) || null, [locations, fromId]);

  const toCity = useMemo(() => locations?.find((loc) => loc.id === toId) || null, [locations, toId]);

  return { fromCity, toCity };
};
