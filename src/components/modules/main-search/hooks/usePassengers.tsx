"use client";

import useToggleOpen from '@/hooks/useToggleOpen';
import { useCallback } from 'react';

export const usePassengers = () => {
  const { open, handleSetOpen, handleToggleOpen } = useToggleOpen();

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        handleSetOpen(false);
      }
    },
    [handleSetOpen]
  );

  return {
    handleToggleOpen,
    handleBlur,
    open,
  };
};
