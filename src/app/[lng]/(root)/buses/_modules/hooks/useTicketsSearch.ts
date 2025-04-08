'use client';

import { getRoutes } from '@/actions/route-actions';
import { useFilterTicketsStore } from '@/store/useFilterTickets';
import { useSearchStore } from '@/store/useSearch';
import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

export default function useTicketsSearch() {
  const from = useSearchStore(useShallow((state) => state.from));
  const to = useSearchStore(useShallow((state) => state.to));
  const adult = useSearchStore(useShallow((state) => state.adult));
  const children = useSearchStore(useShallow((state) => state.children));
  const date = useSearchStore(useShallow((state) => state.date));
  const setTickets = useFilterTicketsStore((state) => state.setTickets);

  const currentLanguage = useLocale();

  const { isFetching, data, error } = useQuery({
    queryKey: ['routes-search', from?.id, to?.id, date, currentLanguage, adult, children],

    queryFn: () =>
      getRoutes({
        fromCityId: from?.id ?? 0,
        toCityId: to?.id ?? 0,
        travelDate: date,
        locale: currentLanguage,
      }),

    enabled: !!from && !!to,
  });

  useEffect(() => {
    if (data) {
      setTickets(data.filter((el) => el?.seats?.free_seats && el?.seats?.free_seats >= adult + children));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { isFetching, error, data };
}
