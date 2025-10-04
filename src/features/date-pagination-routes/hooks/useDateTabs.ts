'use client';

import { useRouterSearch } from '@/shared/hooks/useRouterSearch';
import { toDate, format, addDays } from 'date-fns';
import { useMemo, useCallback } from 'react';

const TABS_LENGTH = 5;
const CENTER_INDEX = Math.floor(TABS_LENGTH / 2);

const createDateArr = (centerDate: Date, length: number, centerIdx: number): Date[] => {
  return Array.from({ length }, (_, i) => addDays(centerDate, i - centerIdx));
};

export const useDateTabs = () => {
  const [params, actions] = useRouterSearch();

  const tabDate = useMemo(() => toDate(params.date || new Date()), [params.date]);

  const datesArray = useMemo(() => createDateArr(tabDate, TABS_LENGTH, CENTER_INDEX), [tabDate]);

  const handleUpdateDate = useCallback(
    (newDate: Date) => {
      const formatted = format(newDate, 'yyyy-MM-dd');
      actions.setDate(formatted);
    },
    [actions],
  );

  return {
    handleUpdateDate,
    tabDate,
    datesArray,
    enabled: !!params,
  };
};
