'use client';

import { useQuery } from '@tanstack/react-query';
import { getLocationById } from '@/shared/api/location.actions';
import { useRouterSearch } from '@/shared/hooks/useRouterSearch';

export const useTripCities = () => {
  const [params] = useRouterSearch();

  const { data: fromCity = null } = useQuery({
    queryKey: ['location', params.from],
    queryFn: () => getLocationById(Number(params.from)),
    enabled: !!params.from,
    staleTime: 60 * 60 * 1000,
  });

  const { data: toCity = null } = useQuery({
    queryKey: ['location', params.to],
    queryFn: () => getLocationById(Number(params.to)),
    enabled: !!params.to,
    staleTime: 60 * 60 * 1000,
  });

  return { fromCity, toCity };
};
