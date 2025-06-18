'use client';

import { useSearchParams } from 'next/navigation';
import { useSearchStore } from '@/store/useSearch';
import { useShallow } from 'zustand/react/shallow';
import { useMemo } from 'react';
import { ILocation } from '@/types/location.types';

export type SearchQueryData = {
  from: string | ILocation | null;
  to: string | ILocation | null;
  adult: number;
  children: number;
  date: string | null;
};

export function useSearchQueryData(): SearchQueryData {
  const searchParams = useSearchParams();

  const from = useSearchStore(useShallow((state) => state.from));
  const to = useSearchStore(useShallow((state) => state.to));
  const adult = useSearchStore(useShallow((state) => state.adult));
  const children = useSearchStore(useShallow((state) => state.children));
  const date = useSearchStore(useShallow((state) => state.date));

  return useMemo(() => {
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
}
