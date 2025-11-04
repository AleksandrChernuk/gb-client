'use client';

import { getRoutes } from '@/shared/api/route.actions';
import { useRouterSearch } from '@/shared/hooks/useRouterSearch';
import { useFilterTickets } from '@/shared/store/useFilterTickets';
import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';
import { adaptRoutesForRender, TAdaptedRoute } from '@/shared/lib/adaptRoutesForRender';

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
      const adapted = adaptRoutesForRender(data);

      const singleRoutes = adapted.filter((r: TAdaptedRoute) => r.type === 'single');

      const plainRoutes = singleRoutes.map((r) => r.data);

      setTickets(plainRoutes);
    }
  }, [data, setTickets]);

  return {
    isFetching,
    data,
    error,
    tickets,
  };
}
