'use client';

import { toDate, format, addDays } from 'date-fns';
import { useMemo, useCallback } from 'react';
import { useSearchStore } from '@/shared/store/useSearch';
import { useShallow } from 'zustand/react/shallow';
import { useRouter, usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const TABS_LENGTH = 5;
const CENTER_INDEX = Math.floor(TABS_LENGTH / 2);

const createDateArr = (centerDate: Date, length: number, centerIdx: number): Date[] => {
  return Array.from({ length }, (_, i) => addDays(centerDate, i - centerIdx));
};

export const useDateTabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    date: currentDate,
    setDate,
    from,
    to,
  } = useSearchStore(
    useShallow((state) => ({
      date: state.date,
      setDate: state.setDate,
      from: state.from,
      to: state.to,
    })),
  );

  const enabled = !!from && !!to;

  const tabDate = useMemo(() => toDate(currentDate || new Date()), [currentDate]);

  const datesArray = useMemo(() => createDateArr(tabDate, TABS_LENGTH, CENTER_INDEX), [tabDate]);

  const handleUpdateDate = useCallback(
    (newDate: Date) => {
      const formatted = format(newDate, 'yyyy-MM-dd');
      setDate(formatted);

      const params = new URLSearchParams(searchParams.toString());
      params.set('date', formatted);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [setDate, router, pathname, searchParams],
  );

  return {
    handleUpdateDate,
    tabDate,
    datesArray,
    enabled,
  };
};
