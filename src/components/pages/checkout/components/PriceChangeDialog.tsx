'use client';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { useTranslations } from 'next-intl';
import useTimer from '../hooks/useTimer';

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
