"use client";

import { useCallback, useRef } from 'react';
import { format } from 'date-fns';
import useToggleOpen from '@/hooks/useToggleOpen';
import { useSearchStore } from '@/store/useSearch';

export const useDate = () => {
  const { open, handleSetOpen, handleToggleOpen } = useToggleOpen();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const setDate = useSearchStore((state) => state.setDate);

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        handleSetOpen(false);
      }
    },
    [handleSetOpen]
  );

  const handleSelectDate = (data: Date) => {
    handleSetOpen(false);
    setDate(format(data || new Date(), 'yyyy-MM-dd'));
  };

  return {
    open,
    handleToggleOpen,
    setDate,
    handleSelectDate,
    handleBlur,
    inputRef,
  };
};
