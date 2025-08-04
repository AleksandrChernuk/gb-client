'use client';

import { useTimerStore } from '@/store/useTimer';
import { useEffect } from 'react';

export default function useTimer() {
  const {
    startedAt,
    priceDialogShown,
    open,
    openPriceChange,
    reset,
    setStartedAt,
    setPriceDialogShown,
    setOpen,
    setOpenPriceChange,
    hasHydrated,
  } = useTimerStore();

  useEffect(() => {
    if (!hasHydrated) return;
    const start = startedAt || Date.now();
    if (!startedAt) {
      setStartedAt(start);
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - start;
      if (elapsed >= 15 * 60 * 100) {
        setOpen(true);
        setOpenPriceChange(false);
        clearInterval(interval);
      }
      if (!priceDialogShown && elapsed >= 10 * 100) {
        setOpenPriceChange(true);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [hasHydrated, priceDialogShown, setOpen, setOpenPriceChange, setStartedAt, startedAt]);

  const handleClosePriceChange = () => {
    setOpenPriceChange(false);
    setPriceDialogShown(true);
  };

  return {
    open,
    openPriceChange,
    handleClosePriceChange,
    setPriceDialogShown,
    reset,
  };
}
