'use client';

import { useNewOrderResult } from '@/store/useOrderResult';
import useTimer from './useTimer';
import { useMemo } from 'react';

export function useConfirmationDialogState() {
  const { open, openPriceChange } = useTimer();
  const initiateNewOrder = useNewOrderResult((s) => s.initiateNewOrder);
  const initiateOtpVerify = useNewOrderResult((s) => s.initiateOtpVerify);
  return useMemo(() => {
    if (initiateOtpVerify) return 'OTP';
    if (openPriceChange) return 'PRICE_CHANGE';
    if (open) return 'STILL_ONLINE';
    if (initiateNewOrder) return 'NEW_ORDER';
    return 'NONE';
  }, [initiateOtpVerify, openPriceChange, open, initiateNewOrder]);
}
