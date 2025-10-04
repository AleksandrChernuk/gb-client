'use client';

import { NewOrderDialog } from '@/entities/checkout/NewOrderDialog';
import { OtpDialog } from '@/entities/checkout/OtpDialog';
import { StillOnlineDialog } from '@/entities/checkout/StillOnlineDialog';
import { useConfirmationDialogState } from '@/features/checkout-form/hooks/useConfirmOrederState';
import { Dialog, DialogContent } from '@/shared/ui/dialog';
import useTimer from '@/features/checkout-form/hooks/useTimer';

export function ConfirmationDialog() {
  const state = useConfirmationDialogState();
  const { open } = useTimer();

  const dialogContent = open ? (
    <StillOnlineDialog />
  ) : state === 'OTP' ? (
    <OtpDialog />
  ) : state === 'NEW_ORDER' ? (
    <NewOrderDialog />
  ) : null;

  const isOpen = open || state !== 'NONE';

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[512px] mx-auto rounded-2xl gap-4">{dialogContent}</DialogContent>
    </Dialog>
  );
}
