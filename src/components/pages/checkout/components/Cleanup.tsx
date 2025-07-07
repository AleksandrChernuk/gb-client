'use client';

import { useEffect } from 'react';
import { useTimerStore } from '@/store/useTimer';
import { useCurrentTicket } from '@/store/useCurrentTicket';

export default function Cleanup() {
  const reset = useTimerStore((state) => state.reset);
  const resetCurrentTicket = useCurrentTicket((state) => state.resetCurrentTicket);

  useEffect(() => {
    return () => {
      reset();
      resetCurrentTicket();
    };
  }, [reset, resetCurrentTicket]);

  return null;
}
