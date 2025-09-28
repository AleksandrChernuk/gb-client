'use client';

import { getRoutes } from '@/shared/api/route.actions';
import { useFilterTickets } from '@/shared/store/useFilterTickets';
import { useSearchStore } from '@/shared/store/useSearch';
import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

export default function useTicketsSearch() {
  const currentLanguage = useLocale();

  const fromId = useSearchStore(useShallow((state) => state.from));
  const toId = useSearchStore(useShallow((state) => state.to));
  const adult = useSearchStore(useShallow((state) => state.adult));
  const children = useSearchStore(useShallow((state) => state.children));
  const date = useSearchStore(useShallow((state) => state.date));

  const setTickets = useFilterTickets((state) => state.setTickets);
  const tickets = useFilterTickets((state) => state.filteredTickets);

  const enabled = !!fromId && !!toId && !!date;

  const { isFetching, data, error } = useQuery({
    queryKey: ['routes-search', fromId, toId, adult, children, date, currentLanguage],
    queryFn: () =>
      getRoutes({
        fromCityId: fromId!,
        toCityId: toId!,
        travelDate: date,
        locale: currentLanguage,
      }),
    enabled,
  });

  useEffect(() => {
    if (data) {
      setTickets(data.filter((element) => element?.seats?.freeSeats && element?.seats?.freeSeats >= adult + children));
    }
  }, [data, adult, children, setTickets]);

  return {
    isFetching,
    error,
    data: enabled ? (data ?? []) : tickets,
  };
}
