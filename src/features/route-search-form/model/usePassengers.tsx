'use client';

import { useCallback, useState } from 'react';

export const usePassengers = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleBlur = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpen(false);
    }
  }, []);

  const handleToggleOpen = useCallback(() => {
    setOpen((p) => !p);
  }, []);

  return {
    handleToggleOpen,
    handleBlur,
    open,
  };
};
