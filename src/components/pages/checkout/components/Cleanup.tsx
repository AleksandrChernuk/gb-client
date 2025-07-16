/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect } from 'react';
import { useTimerStore } from '@/store/useTimer';
import { useSelectedTickets } from '@/store/useSelectedTickets';
import { useNewOrderResult } from '@/store/useOrderResult';

export default function Cleanup() {
  const reset = useTimerStore((state) => state.reset);
  const resetSelectedTicket = useSelectedTickets((state) => state.resetSelectedTicket);
  const resetInitiateNewOrder = useNewOrderResult((state) => state.resetInitiateNewOrder);

  useEffect(() => {
    return () => {
      reset();
      resetSelectedTicket();
      resetInitiateNewOrder();
    };
  }, []);

  return null;
}
