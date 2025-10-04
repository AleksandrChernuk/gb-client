'use client';

import { useCallback, useRef, useState } from 'react';
import { format } from 'date-fns';
import { useRouterSearch } from '@/shared/hooks/useRouterSearch';

export const useDate = () => {
  const [open, setOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [, actions] = useRouterSearch();

  const handleBlur = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpen(false);
    }
  }, []);

  const handleSelectDate = (data: Date) => {
    actions.setDate(format(data || new Date(), 'yyyy-MM-dd'));
    setOpen(false);
  };

  const handleToggleOpen = useCallback(() => {
    setOpen((p) => !p);
  }, []);

  return {
    open,
    handleToggleOpen,
    handleSelectDate,
    handleBlur,
    inputRef,
  };
};
