'use client';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { useTranslations } from 'next-intl';
import useTimer from '@/features/checkout-form/hooks/useTimer';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

export const PriceChangeDialog = () => {
  const { handleClosePriceChange } = useTimer();

  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);

  return (
    <>
      <DialogHeader>
        <DialogTitle className="tablet:text-2xl text-slate-700 dark:text-slate-50">
          {t('price_may_increase')}
        </DialogTitle>
        <DialogDescription className="text-base tablet:text-lg text-slate-700 dark:text-slate-200">
          {t('book_within_1')} <span className="text-green-300 font-medium">15:00 {t('book__min')}</span>{' '}
          {t('book_within_2')}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button size="secondary" variant="default" onClick={handleClosePriceChange}>
          OK
        </Button>
      </DialogFooter>
    </>
  );
};
