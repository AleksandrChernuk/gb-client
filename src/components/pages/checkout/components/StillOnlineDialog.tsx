'use client';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { useTranslations } from 'next-intl';
import { useTimerStore } from '@/store/useTimer';
import { useNewOrderResult } from '@/store/useOrderResult';
import { useRouter } from 'next/navigation';

export function StillOnlineDialog() {
  const resetInitiateNewOrder = useNewOrderResult((s) => s.resetInitiateNewOrder);
  const router = useRouter();
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);

  const { reset } = useTimerStore();

  const handleCancel = () => {
    reset();
    resetInitiateNewOrder();
    router.back();
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="tablet:text-2xl text-slate-700 dark:text-slate-50">
          {t('still_online_title')}
        </DialogTitle>
        <DialogDescription className="text-base tablet:text-lg text-slate-700 dark:text-slate-200">
          {t('still_online_description')}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="default" size="primary" onClick={handleCancel}>
          {t('payment_confirm_to_search')}
        </Button>
      </DialogFooter>
    </>
  );
}
