import { useQuery } from '@tanstack/react-query';
import { getLocationById, getLocations, getFavoriteLocations } from '@/shared/api/location.actions';

export function useLocations() {
  return useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const response = await getLocations({ query: '', perPage: 500 });
      return response?.data ?? [];
    },
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
