/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect } from 'react';
import { useTimerStore } from '@/shared/store/useTimer';
import { useSelectedTickets } from '@/shared/store/useSelectedTickets';
import { useNewOrderResult } from '@/shared/store/useOrderResult';

export default function Cleanup() {
  const reset = useTimerStore((state) => state.reset);
  const resetSelectedTicket = useSelectedTickets((state) => state.resetSelectedTicket);
  const resetInitiateNewOrder = useNewOrderResult((state) => state.resetInitiateNewOrder);

  useEffect(() => {
    return () => {
      reset();
      resetSelectedTicket();
      resetInitiateNewOrder();
      sessionStorage.removeItem('checkout-form');
    };
  }, []);

  return null;
}
