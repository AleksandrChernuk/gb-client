// hooks/useLocations.ts

import { useQuery } from '@tanstack/react-query';
import { getLocationById, getLocations, getFavoriteLocations } from '@/actions/location.actions';

export function useLocations(query: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['locations', query],
    queryFn: async () => {
      const response = await getLocations({ query, perPage: 99 });
      return response.data;
    },
    ...options,
  });
}

export function useLocationById(id: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['location', id],
    queryFn: () => getLocationById(id),
    ...options,
  });
}

export function useFavoriteLocations() {
  return useQuery({
    queryKey: ['locations', 'favorites'],
    queryFn: getFavoriteLocations,
  });
}
