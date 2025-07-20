'use client';

import { useSelectedTickets } from '@/store/useSelectedTickets';
import { useEffect } from 'react';

function ClearLocal() {
  const resetCurrentTicket = useSelectedTickets((state) => state.resetSelectedTicket);

  useEffect(() => {
    return () => {
      localStorage.removeItem('form');
      localStorage.removeItem('timer');
      resetCurrentTicket();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default ClearLocal;
