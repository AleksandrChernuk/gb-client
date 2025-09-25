'use client';

import { NewOrderDialog } from '@/entities/checkout/NewOrderDialog';
import { OtpDialog } from '@/entities/checkout/OtpDialog';
import { PriceChangeDialog } from '@/features/checkout-form/ui/PriceChangeDialog';
import { StillOnlineDialog } from '@/entities/checkout/StillOnlineDialog';
import { useConfirmationDialogState } from '@/features/checkout-form/models/hooks/useConfirmOrederState';
import { Dialog, DialogContent } from '@/shared/ui/dialog';

export function ConfirmationDialog() {
  const state = useConfirmationDialogState();

  const dialogContent = (() => {
    switch (state) {
      case 'NEW_ORDER':
        return <NewOrderDialog />;
      case 'OTP':
        return <OtpDialog />;
      case 'PRICE_CHANGE':
        return <PriceChangeDialog />;
      case 'STILL_ONLINE':
        return <StillOnlineDialog />;
      default:
        return null;
    }
  })();

  const isOpen = state !== 'NONE';

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[512px] mx-auto rounded-2xl gap-4">{dialogContent}</DialogContent>
    </Dialog>
  );
}
