'use client';

import { useEffect } from 'react';
import { useLocationsStore } from '@/shared/store/useLocations';
import { useShallow } from 'zustand/react/shallow';
import { ILocation } from '@/shared/types/location.types';

type Props = {
  locations?: ILocation[];
  favoriteLocations?: ILocation[];
};

export default function LocationsInitializer({ locations, favoriteLocations }: Props) {
  const setLocations = useLocationsStore(useShallow((state) => state.setLocations));
  const setFavoriteLocations = useLocationsStore(useShallow((state) => state.setFavoriteLocations));

  useEffect(() => {
    if (locations?.length) {
      setLocations(locations);
    }
  }, [locations, setLocations]);

  useEffect(() => {
    if (favoriteLocations?.length) {
      setFavoriteLocations(favoriteLocations);
    }
  }, [favoriteLocations, setFavoriteLocations]);

  return null;
}
