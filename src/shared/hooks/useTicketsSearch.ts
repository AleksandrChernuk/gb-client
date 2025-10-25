'use client';

import { getRoutes } from '@/shared/api/route.actions';
import { useRouterSearch } from '@/shared/hooks/useRouterSearch';
import { useFilterTickets } from '@/shared/store/useFilterTickets';
import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';

export default function useTicketsSearch() {
  const currentLanguage = useLocale();

  const [params] = useRouterSearch();

  const setTickets = useFilterTickets((state) => state.setTickets);
  const tickets = useFilterTickets((state) => state.filteredTickets);

  const enabled = !!params.from && !!params.to && !!params.date;

  const { isFetching, data, error } = useQuery({
    queryKey: ['routes-search', params.from, params.to, params.voyagers, params.date, currentLanguage],
    queryFn: () =>
      getRoutes({
        fromCityId: Number(params.from ?? 0),
        toCityId: Number(params.to ?? 0),
        travelDate: params.date,
        locale: currentLanguage,
      }),
    enabled,
  });

  useEffect(() => {
    if (data) {
      setTickets(data.filter((element) => element?.seats?.freeSeats && element?.seats?.freeSeats >= params.voyagers));
    }
  }, [data, setTickets, params.voyagers]);

  return {
    isFetching,
    error,
    data: enabled ? (data ?? []) : tickets,
  };
}
