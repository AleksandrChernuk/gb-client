'use client';

import { useRouterSearch } from '@/shared/hooks/useRouterSearch';
import { useLocationsStore } from '@/shared/store/useLocations';
import { useMemo } from 'react';

export const useCityData = () => {
  const [params] = useRouterSearch();

  const locations = useLocationsStore((state) => state.locations);

  const fromCity = useMemo(
    () => locations?.find((loc) => loc.id === Number(params.from)) || null,
    [locations, params.from],
  );

  const toCity = useMemo(() => locations?.find((loc) => loc.id === Number(params.to)) || null, [locations, params.to]);

  return { fromCity, toCity };
};
