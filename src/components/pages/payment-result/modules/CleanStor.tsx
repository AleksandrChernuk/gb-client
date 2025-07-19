'use client';

import { useNewOrderResult } from '@/store/useOrderResult';
import { useSelectedTickets } from '@/store/useSelectedTickets';
import { useTimerStore } from '@/store/useTimer';
import { useEffect } from 'react';

export const CleanOrderData = () => {
  useEffect(() => {
    if (!sessionStorage.getItem('order-result')) return;
    useTimerStore.getState().reset();
    useSelectedTickets.getState().resetSelectedTicket();
    useNewOrderResult.getState().resetInitiateNewOrder();

    sessionStorage.removeItem('order-result');
    sessionStorage.removeItem('selected-tickets');
    sessionStorage.removeItem('checkout-timer');
  }, []);

  return null;
};
