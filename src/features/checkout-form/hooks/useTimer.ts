'use client';

import { useEffect, useRef } from 'react';
import { useTimerStore } from '@/shared/store/useTimer';

export default function useTimer() {
  const { startedAt, open, reset, setStartedAt, setOpen, hasHydrated } = useTimerStore();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!hasHydrated) return;

    if (intervalRef.current) return;

    const startTime = startedAt ?? Date.now();

    if (!startedAt) setStartedAt(startTime);

    const elapsed = Date.now() - startTime;
    if (elapsed >= 10 * 60 * 1000) {
      setOpen(true);
      return;
    }

    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const diff = now - startTime;

      if (diff >= 10 * 60 * 1000) {
        setOpen(true);
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [hasHydrated, startedAt, setStartedAt, setOpen]);

  return {
    open,
    reset,
  };
}
