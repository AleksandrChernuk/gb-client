'use client';

import { isEqual, toDate, format } from 'date-fns';
import { useEffect, useState } from 'react';
import { createDateArr } from '../helpers';
import { useSearchStore } from '@/store/useSearch';
import { useShallow } from 'zustand/react/shallow';

export const useDateTabs = () => {
  const currentDate = useSearchStore((state) => state.date);
  const setDate = useSearchStore((state) => state.setDate);

  const from = useSearchStore(useShallow((state) => state.from));
  const to = useSearchStore(useShallow((state) => state.to));

  const enabled = !!from?.id && !!to?.id;

  const [tabDate, setTabDate] = useState<Date>(toDate(currentDate || new Date()));
  const [datesArray, setDatesArray] = useState<Date[]>(createDateArr(toDate(tabDate), 5, Math.floor(5 / 2)));

  useEffect(() => {
    setTabDate(toDate(currentDate || new Date()));
    setDatesArray(createDateArr(toDate(currentDate), 5, Math.floor(5 / 2)));
  }, [currentDate]);

  const handleUpdateDate = (newDate: Date) => {
    setTabDate(newDate);

    const formatted = format(newDate, 'yyyy-MM-dd');
    if (setDate) {
      setDate(formatted);
    }

    const firstDate = datesArray[0];
    const lastDate = datesArray[datesArray.length - 1];

    if (isEqual(newDate, lastDate)) {
      const nextCenter = new Date(lastDate);
      nextCenter.setDate(nextCenter.getDate() + 1);
      setDatesArray(createDateArr(nextCenter, 5, Math.floor(5 / 2)));
    } else if (isEqual(newDate, firstDate)) {
      const prevCenter = new Date(firstDate);
      prevCenter.setDate(prevCenter.getDate() - 1);
      setDatesArray(createDateArr(prevCenter, 5, Math.floor(5 / 2)));
    }
  };
  return {
    handleUpdateDate,
    tabDate,
    setTabDate,
    datesArray,
    enabled,
  };
};
