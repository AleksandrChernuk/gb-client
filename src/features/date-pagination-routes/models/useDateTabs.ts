// 'use client';

// import { useRouterSearch } from '@/shared/hooks/useRouterSearch';
// import { toDate, format, addDays } from 'date-fns';
// import { useMemo, useCallback } from 'react';

// const TABS_LENGTH = 5;
// const CENTER_INDEX = Math.floor(TABS_LENGTH / 2);

// const createDateArr = (centerDate: Date, length: number, centerIdx: number): Date[] => {
//   return Array.from({ length }, (_, i) => addDays(centerDate, i - centerIdx));
// };

// export const useDateTabs = () => {
//   const [params, actions] = useRouterSearch();

//   const tabDate = useMemo(() => toDate(params.date || new Date()), [params.date]);

//   const datesArray = useMemo(() => createDateArr(tabDate, TABS_LENGTH, CENTER_INDEX), [tabDate]);

//   const handleUpdateDate = useCallback(
//     (newDate: Date) => {
//       const formatted = format(newDate, 'yyyy-MM-dd');
//       actions.setDate(formatted);
//     },
//     [actions],
//   );

//   return {
//     handleUpdateDate,
//     tabDate,
//     datesArray,
//     enabled: !!params,
//   };
// };
// useDateTabs.ts
'use client';

import { useRouterSearch } from '@/shared/hooks/useRouterSearch';
import { toDate, format, addDays, startOfDay } from 'date-fns';
import { useMemo, useCallback, useState } from 'react';

const TABS_LENGTH = 5;
const CENTER_INDEX = Math.floor(TABS_LENGTH / 2);

const createDateArr = (centerDate: Date, length: number, centerIdx: number): Date[] => {
  return Array.from({ length }, (_, i) => addDays(centerDate, i - centerIdx));
};

export const useDateTabs = () => {
  const [params, actions] = useRouterSearch();

  const tabDate = useMemo(() => startOfDay(toDate(params.date || new Date())), [params.date]);

  const [viewCenter, setViewCenter] = useState(() => tabDate);

  const datesArray = useMemo(() => createDateArr(viewCenter, TABS_LENGTH, CENTER_INDEX), [viewCenter]);

  const handleUpdateDate = useCallback(
    (newDate: Date) => {
      const normalized = startOfDay(newDate);
      actions.setDate(format(normalized, 'yyyy-MM-dd'));

      // Если кликнули на крайний таб — сдвигаем массив, ставим дату в центр
      const index = datesArray.findIndex((d) => d.getTime() === normalized.getTime());
      if (index === 0 || index === datesArray.length - 1) {
        setViewCenter(normalized);
      }
    },
    [actions, datesArray],
  );

  const handleNavigate = useCallback(
    (direction: -1 | 1) => {
      const newDate = addDays(tabDate, direction);
      actions.setDate(format(newDate, 'yyyy-MM-dd'));
      setViewCenter(newDate);
    },
    [actions, tabDate],
  );

  return {
    handleUpdateDate,
    handleNavigate,
    tabDate,
    datesArray,
  };
};
