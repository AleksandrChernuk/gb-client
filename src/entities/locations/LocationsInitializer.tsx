'use client';

import { useEffect } from 'react';
import { useLocationsStore } from '@/shared/store/useLocations';
import { useShallow } from 'zustand/react/shallow';
import { useFavoriteLocations, useLocations } from '@/shared/hooks/useLocations';

export default function LocationsInitializer() {
  const setLocations = useLocationsStore(useShallow((state) => state.setLocations));
  const setFavoriteLocations = useLocationsStore(useShallow((state) => state.setFavoriteLocations));

  const { data } = useLocations();
  console.log(data);
  const { data: favoriteLocations } = useFavoriteLocations();
  useEffect(() => {
    if (data?.length) setLocations(data);
    if (favoriteLocations?.length) setFavoriteLocations(favoriteLocations);
  }, [data, favoriteLocations, setFavoriteLocations, setLocations]);

  return null;
}
