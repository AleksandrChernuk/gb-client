'use client';

import { useNewOrderResult } from '@/shared/store/useOrderResult';
import useTimer from './useTimer';

type DialogState = 'OTP' | 'PRICE_CHANGE' | 'STILL_ONLINE' | 'NEW_ORDER' | 'NONE';

export function useConfirmationDialogState(): DialogState {
  const { open, openPriceChange } = useTimer();
  const initiateNewOrder = useNewOrderResult((s) => s.initiateNewOrder);
  const initiateOtpVerify = useNewOrderResult((s) => s.initiateOtpVerify);

  if (initiateOtpVerify) return 'OTP';
  if (openPriceChange) return 'PRICE_CHANGE';
  if (open) return 'STILL_ONLINE';
  if (initiateNewOrder) return 'NEW_ORDER';
  return 'NONE';
}
