/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect } from 'react';
import { useTimerStore } from '@/store/useTimer';
import { useSelectedTickets } from '@/store/useSelectedTickets';

export default function Cleanup() {
  const reset = useTimerStore((state) => state.reset);
  const resetSelectedTicket = useSelectedTickets((state) => state.resetSelectedTicket);

  useEffect(() => {
    return () => {
      reset();
      resetSelectedTicket();
    };
  }, []);

  return null;
}
