/* eslint-disable prefer-const */
'use client';

import { useTimerStore } from '@/store/useTimer';
import { useEffect, useState } from 'react';

const WARNING_DELAY_MS = 10000;
const TIMEOUT_DIALOG_DELAY_MS = 15 * 60 * 1000;

export default function useTimer() {
  const [open, setOpen] = useState(false);
  const [openPriceChange, setOpenPriceChange] = useState(false);
  const { startedAt, priceDialogShown, reset, setStartedAt, setPriceDialogShown, hasHydrated } = useTimerStore();

  const [timeLeft, setTimeLeft] = useState(() => {
    if (startedAt) {
      return Math.max(TIMEOUT_DIALOG_DELAY_MS - (Date.now() - startedAt), 0);
    }
    return TIMEOUT_DIALOG_DELAY_MS;
  });

  useEffect(() => {
    if (!hasHydrated) return;
    const start = startedAt || Date.now();
    if (!startedAt) {
      setStartedAt(start);
    }

    const updateTimer = () => {
      const now = Date.now();
      const elapsed = now - (start as number);
      setTimeLeft(Math.max(TIMEOUT_DIALOG_DELAY_MS - elapsed, 0));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    let warningTimeout: ReturnType<typeof setTimeout>;
    let mainTimeout: ReturnType<typeof setTimeout>;

    if (!priceDialogShown) {
      const now = Date.now();
      const elapsed = now - (start as number);
      const leftForWarning = Math.max(WARNING_DELAY_MS - elapsed, 0);

      warningTimeout = setTimeout(() => {
        setOpenPriceChange(true);
      }, leftForWarning);
    }

    const now = Date.now();
    const elapsed = now - (start as number);
    const leftForDialog = Math.max(TIMEOUT_DIALOG_DELAY_MS - elapsed, 0);

    mainTimeout = setTimeout(() => {
      setOpen(true);
      setOpenPriceChange(false);
    }, leftForDialog);

    return () => {
      clearInterval(interval);
      clearTimeout(warningTimeout);
      clearTimeout(mainTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated]);

  const restartWithoutPriceDialog = () => {
    setStartedAt(Date.now());
    setPriceDialogShown(true);
    setOpen(false);
    setOpenPriceChange(false);
  };

  const handleClosePriceChange = () => {
    setOpenPriceChange(false);
    setPriceDialogShown(true);
  };

  return { handleClosePriceChange, timeLeft, open, openPriceChange, reset, restartWithoutPriceDialog };
}
