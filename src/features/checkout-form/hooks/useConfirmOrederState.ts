'use client';

import useTimer from '@/features/checkout-form/hooks/useTimer';
import { useNewOrderResult } from '@/shared/store/useOrderResult';
import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

type DialogState = 'OTP' | 'PRICE_CHANGE' | 'STILL_ONLINE' | 'NEW_ORDER' | 'NONE';

function useConfirmationDialogState(): DialogState {
  const { open } = useTimer();

  const { initiateNewOrder, initiateOtpVerify } = useNewOrderResult(
    useShallow((s) => ({
      initiateNewOrder: s.initiateNewOrder,
      initiateOtpVerify: s.initiateOtpVerify,
    })),
  );

  return useMemo(() => {
    if (initiateOtpVerify) return 'OTP';
    if (open) return 'STILL_ONLINE';
    if (initiateNewOrder) return 'NEW_ORDER';
    return 'NONE';
  }, [initiateOtpVerify, open, initiateNewOrder]);
}

export default useConfirmationDialogState;
