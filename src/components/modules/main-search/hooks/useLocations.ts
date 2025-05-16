'use client';

import { useQuery } from '@tanstack/react-query';
import { getLocationById, getLocations } from '@/actions/location.actions';
import { ILocation } from '@/types/location.types';

export function useLocations() {
  return useQuery({
    queryKey: ['locations'],
    queryFn: async (): Promise<Array<ILocation>> => {
      const response = await getLocations({ query: '', perPage: 99 });
      return response.data;
    },
  });
}

export function useLocationsById(id: number) {
  return useQuery({
    queryKey: ['locations', id],
    queryFn: async (): Promise<ILocation> => {
      const response = await getLocationById(id);
      return response;
    },
  });
}
