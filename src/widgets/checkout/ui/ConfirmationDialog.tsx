'use client';

import { Dialog, DialogContent } from '@/shared/ui/dialog';
import { NewOrderDialog, OtpDialog, StillOnlineDialog, useConfirmationDialogState } from '@/features/checkout-form';
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
      <DialogContent className="sm:max-w-[512px] mx-auto rounded-2xl ">
        <div className="grid gap-4 w-full relative">{dialogContent}</div>
      </DialogContent>
    </Dialog>
  );
}
