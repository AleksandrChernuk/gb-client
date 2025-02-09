"use client";

import { isEqual, toDate, format } from 'date-fns';
import { useEffect, useState } from 'react';
import { createDateArr } from '../helpers';
import { useSearchStore } from '@/store/useSearch';

export const useDateTabs = () => {
  const currentDate = useSearchStore((state) => state.date);
  const setDate = useSearchStore((state) => state.setDate);

  const [tabDate, setTabDate] = useState<Date>(toDate(currentDate || new Date()));
  const [datesArray, setDatesArray] = useState<Date[]>(
    createDateArr(toDate(tabDate), 5, Math.floor(5 / 2))
  );

  useEffect(() => {
    setTabDate(toDate(currentDate || new Date()));
    setDatesArray(createDateArr(toDate(currentDate), 5, Math.floor(5 / 2)));
  }, [currentDate]);

  const handleUpdateDate = (newDate: Date) => {
    setTabDate(newDate);
    if (setDate) {
      setDate(format(newDate, 'yyyy-MM-dd'));
    }

    const firstDate = datesArray[0];
    const lastDate = datesArray[datesArray.length - 1];

    if (isEqual(newDate, lastDate) || isEqual(newDate, firstDate)) {
      setDatesArray(createDateArr(toDate(newDate), 7, Math.floor(7 / 2)));
    }
  };

  return {
    handleUpdateDate,
    tabDate,
    setTabDate,
    datesArray,
  };
};
