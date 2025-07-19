/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
'use client';

import { getRoutes } from '@/actions/route.actions';
import { useFilterTickets } from '@/store/useFilterTickets';
import { useSearchStore } from '@/store/useSearch';
import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

export default function useTicketsSearch() {
  const currentLanguage = useLocale();

  const from = useSearchStore(useShallow((state) => state.from));
  const to = useSearchStore(useShallow((state) => state.to));
  const adult = useSearchStore(useShallow((state) => state.adult));
  const children = useSearchStore(useShallow((state) => state.children));
  const date = useSearchStore(useShallow((state) => state.date));
  const setTickets = useFilterTickets((state) => state.setTickets);
  const tickets = useFilterTickets((state) => state.filteredTickets);

  const enabled = !!from?.id && !!to?.id && !!date;

  const { isFetching, data, error } = useQuery({
    queryKey: ['routes-search', from?.id, to?.id, adult, children, date, currentLanguage],
    queryFn: () =>
      getRoutes({
        fromCityId: from?.id!,
        toCityId: to?.id!,
        travelDate: date,
        locale: currentLanguage,
      }),
    enabled,
  });
  useEffect(() => {
    if (data) {
      setTickets(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return {
    isFetching,
    error,
    data: enabled ? (data ?? []) : tickets,
  };
}
