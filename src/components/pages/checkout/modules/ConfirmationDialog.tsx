'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { OtpDialog } from '../components/OtpDialog';
import { NewOrderDialog } from '../components/NewOrderDialog';
import { PriceChangeDialog } from '../components/PriceChangeDialog';
import { StillOnlineDialog } from '../components/StillOnlineDialog';
import { useConfirmationDialogState } from '../hooks/useConfirmOrederState';

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
