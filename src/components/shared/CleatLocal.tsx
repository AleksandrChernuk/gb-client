'use client';

import { useCurrentTicket } from '@/store/useCurrentTicket';
import { useEffect } from 'react';

function CleatLocal() {
  const resetCurrentTicket = useCurrentTicket((state) => state.resetCurrentTicket);

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

export default CleatLocal;
