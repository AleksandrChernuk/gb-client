'use client';

import { useEffect, useState } from 'react';
import { useTimerStore } from '@/shared/store/useTimer';

const LIMIT_MS = 10 * 60 * 1000;

export function useCountdownTimer() {
  const { startedAt } = useTimerStore();
  const [remaining, setRemaining] = useState(LIMIT_MS);

  useEffect(() => {
    if (!startedAt) return;

    const tick = () => {
      const elapsed = Date.now() - startedAt;
      const newRemaining = Math.max(LIMIT_MS - elapsed, 0);
      setRemaining(newRemaining);
    };

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [startedAt]);

  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return { remaining, formatted, minutes, seconds };
}
