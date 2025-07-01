'use client';

import { useShallow } from 'zustand/react/shallow';
import { useSearchStore } from '@/store/useSearch';
import useDateLocale from '@/hooks/useDateLocale';
import { useDate } from '../hooks/useDate';
import DatePickerDesktop from '../components/DatePickerDesktop';
import DatePickerMobile from '../components/DatePickerMobile';

type Props = {
  variant: 'mobile' | 'desktop';
};

export default function DatePicker({ variant }: Props) {
  const { locale } = useDateLocale();
  const currentDate = useSearchStore(useShallow((state) => state.date));
  const month = useSearchStore((state) => state.month);
  const incrementMonth = useSearchStore((state) => state.incrementMonth);
  const decrementMonth = useSearchStore((state) => state.decrementMonth);
  const setMonth = useSearchStore((state) => state.setMonth);

  const dateUtils = useDate();

  const commonProps = {
    locale,
    currentDate,
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
