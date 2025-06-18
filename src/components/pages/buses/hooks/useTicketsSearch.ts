'use client';

import { getRoutes } from '@/actions/route.actions';
import { useFilterTickets } from '@/store/useFilterTickets';
import { useSearchStore } from '@/store/useSearch';
import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

export default function useTicketsSearch() {
  const searchParams = useSearchParams();
  const [dataError, setDataError] = useState(false);

  const from = useSearchStore(useShallow((state) => state.from));
  const to = useSearchStore(useShallow((state) => state.to));
  const adult = useSearchStore(useShallow((state) => state.adult));
  const children = useSearchStore(useShallow((state) => state.children));
  const date = useSearchStore(useShallow((state) => state.date));
  const setTickets = useFilterTickets((state) => state.setTickets);

  const searchData = useMemo(() => {
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');
    const adultParam = searchParams.get('adult');
    const childrenParam = searchParams.get('children');
    const dateParam = searchParams.get('date');

    return {
      from: fromParam ?? from,
      to: toParam ?? to,
      adult: Number(adultParam) || adult,
      children: Number(childrenParam) || children,
      date: dateParam ?? date,
    };
  }, [searchParams, from, to, adult, children, date]);

  const fromCityId = useMemo(() => {
    if (typeof searchData.from === 'object') {
      return searchData.from?.id;
    }
    const parsed = Number(searchData.from);
    return isNaN(parsed) ? undefined : parsed;
  }, [searchData.from]);

  const toCityId = useMemo(() => {
    if (typeof searchData.to === 'object') {
      return searchData.to?.id;
    }
    const parsed = Number(searchData.to);
    return isNaN(parsed) ? undefined : parsed;
  }, [searchData.to]);

  const currentLanguage = useLocale();
  const { isFetching, data, error } = useQuery({
    queryKey: ['routes-search', fromCityId, toCityId, searchData.date, currentLanguage],
    queryFn: () =>
      getRoutes({
        fromCityId: fromCityId!,
        toCityId: toCityId!,
        travelDate: searchData.date!,
        locale: currentLanguage,
      }),
    enabled: fromCityId !== undefined && toCityId !== undefined && !!searchData.date,
  });

  useEffect(() => {
    if (data) {
      setTickets(
        data.filter((el) => el?.seats?.free_seats && el?.seats?.free_seats >= searchData.adult + searchData.children),
      );
    }
  }, [data, searchData.adult, searchData.children, setTickets]);

  useEffect(() => {
    if (error) {
      setDataError(true);
    }
  }, [error]);

  return { isFetching, error: dataError, data };
}
