'use client';

import { useCallback, useRef, useState } from 'react';
import { format } from 'date-fns';
import { useSearchStore } from '@/store/useSearch';
import { useUpdateSearchParams } from '@/hooks/useUpdateSearchParams';

export const useDate = () => {
  const [open, setOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const setDate = useSearchStore((state) => state.setDate);

  const { setParam } = useUpdateSearchParams();

  const handleBlur = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpen(false);
    }
  }, []);

  const handleSelectDate = (data: Date) => {
    const formatted = format(data || new Date(), 'yyyy-MM-dd');

    setOpen(false);
    setDate(formatted);
    setParam('date', formatted);
  };

  const handleToggleOpen = useCallback(() => {
    setOpen((p) => !p);
  }, []);

  return {
    open,
    handleToggleOpen,
    setDate,
    handleSelectDate,
    handleBlur,
    inputRef,
  };
};
