'use client';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { useTranslations } from 'next-intl';
import { useTimerStore } from '@/shared/store/useTimer';
import { useNewOrderResult } from '@/shared/store/useOrderResult';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { useRouter } from '@/shared/i18n/routing';

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
