'use client';

import { getFavoriteLocations, getLocations } from '@/shared/api/location.actions';
import { useLocationsStore } from '@/shared/store/useLocations';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

export default function LocationsInitializer() {
  const setLocations = useLocationsStore(useShallow((state) => state.setLocations));
  const setFavoriteLocations = useLocationsStore(useShallow((state) => state.setFavoriteLocations));

  const { data: locations } = useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const response = await getLocations({ query: '', perPage: 500 });
      return response;
    },
  });

  const { data: favoritesLocations } = useQuery({
    queryKey: ['locations', 'favorites'],
    queryFn: getFavoriteLocations,
  });

  useEffect(() => {
    if (locations) {
      setLocations(locations?.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations]);

  useEffect(() => {
    if (favoritesLocations) {
      setFavoriteLocations(favoritesLocations);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoritesLocations]);

  return null;
}
