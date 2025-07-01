'use client';

import { useEffect } from 'react';
import { useTimerStore } from '@/store/useTimer';
import { useCurrentTicket } from '@/store/useCurrentTicket';

export default function Cleanup() {
  const reset = useTimerStore((state) => state.reset);
  const resetCurrentTicket = useCurrentTicket((state) => state.resetCurrentTicket);
  const isHydrated = useCurrentTicket((state) => state.isHydrated);

  useEffect(() => {
    if (!isHydrated) return;

    return () => {
      reset();
      resetCurrentTicket();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated]);

  return null;
}
