'use client';

import { useTimerStore } from '@/shared/store/useTimer';
import { useEffect, useRef, useCallback } from 'react';

const PRICE_CHANGE_DELAY = 20 * 1000; // 20 секунд
const TIMEOUT_DELAY = 10 * 60 * 1000; // 10 минут

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

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const priceChangeShownRef = useRef(false);

  // Инициализация startedAt
  useEffect(() => {
    if (hasHydrated && !startedAt) {
      setStartedAt(Date.now());
    }
  }, [hasHydrated, startedAt, setStartedAt]);

  // Основной таймер
  useEffect(() => {
    if (!hasHydrated || !startedAt || open) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startedAt;

      // Показываем диалог изменения цены через 20 секунд (один раз)
      if (
        !priceChangeShownRef.current &&
        !priceDialogShown &&
        elapsed >= PRICE_CHANGE_DELAY &&
        elapsed < TIMEOUT_DELAY
      ) {
        priceChangeShownRef.current = true;
        setOpenPriceChange(true);
      }

      // Показываем диалог таймаута через 10 минут
      if (elapsed >= TIMEOUT_DELAY) {
        setOpen(true);
        setOpenPriceChange(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [hasHydrated, startedAt, open, priceDialogShown, setOpen, setOpenPriceChange]);

  const handleClosePriceChange = useCallback(() => {
    setOpenPriceChange(false);
    setPriceDialogShown(true);
  }, [setOpenPriceChange, setPriceDialogShown]);

  return {
    open,
    openPriceChange,
    handleClosePriceChange,
    setPriceDialogShown,
    reset,
  };
}
