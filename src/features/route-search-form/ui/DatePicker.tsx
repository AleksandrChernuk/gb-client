'use client';

import { startOfMonth, addMonths, subMonths } from 'date-fns';

import { useDate } from '@/features/route-search-form/hooks/useDate';
import useDateLocale from '@/shared/hooks/useDateLocale';
import DatePickerDesktop from '@/features/route-search-form/ui/DatePickerDesktop';
import DatePickerMobile from '@/features/route-search-form/ui/DatePickerMobile';
import { useRouterSearch } from '@/shared/hooks/useRouterSearch';
import { useMemo, useState } from 'react';

type Props = {
  variant: 'mobile' | 'desktop';
};

export default function DatePicker({ variant }: Props) {
  const { locale } = useDateLocale();

  const [params] = useRouterSearch();

  const baseDate = useMemo(() => {
    return params.date ?? new Date();
  }, [params.date]);

  const [month, setMonth] = useState(() => startOfMonth(baseDate));

  const incrementMonth = () => setMonth((prev) => addMonths(prev, 1));
  const decrementMonth = () => setMonth((prev) => subMonths(prev, 1));

  const dateUtils = useDate();

  const commonProps = {
    locale,
    currentDate: baseDate,
    month,

    incrementMonth,
    decrementMonth,
    setMonth,
    ...dateUtils,
  };
  switch (variant) {
    case 'desktop':
      return <DatePickerDesktop {...commonProps} />;
    case 'mobile':
      return <DatePickerMobile {...commonProps} />;
    default:
      return null;
  }
}
