'use client';

import { Button } from '@/components/ui/button';
import { useNewOrderResult } from '@/store/useOrderResult';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useFormContext, useWatch } from 'react-hook-form';
import { LoaderCircle, Search, TicketX } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { usePaymantConfirm } from '../hooks/usePaymantConfirm';
import useTimer from '../hooks/useTimer';
import { formatTime } from '../helpers/formatTime';
import { useEffect, useRef } from 'react';

export default function ConfirmPaymentDialog() {
  const initiateNewOrder = useNewOrderResult((s) => s.initiateNewOrder);
  const resetInitiateNewOrder = useNewOrderResult((s) => s.resetInitiateNewOrder);
  const hasRestarted = useRef(false);

  const { timeLeft, reset, open, openPriceChange, handleClosePriceChange, restartWithoutPriceDialog } = useTimer();

  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);

  const { control } = useFormContext();
  const router = useRouter();

  const { handleCancelOrder, handlePayOrder, handleConfirmlOrder, payLoading } = usePaymantConfirm();
  const paymentType = useWatch({ control, name: 'payment' });

  const isError = initiateNewOrder?.status === 'error' || !!initiateNewOrder?.error;
  const title = isError ? t('payment_confirm_error_title') : t('payment_confirm_title');
  const description = isError ? (
    <p>{initiateNewOrder?.message || t('payment_confirm_error_description')}</p>
  ) : (
    <div className="text-center">
      <p className="text-base">{t('payment_confirm_final_amount')}</p>
      <p className="font-bold text-xl">
        {Math.floor(Number(initiateNewOrder?.amount || 0))} {initiateNewOrder?.currency}
      </p>
    </div>
  );

  useEffect(() => {
    if (!!initiateNewOrder && !hasRestarted.current) {
      restartWithoutPriceDialog();
      hasRestarted.current = true;
    }
  }, [initiateNewOrder, restartWithoutPriceDialog]);

  const actionButtonProps = isError
    ? {
        children: (
          <>
            <Search /> {t('payment_confirm_to_search')}
          </>
        ),
        variant: 'outline' as const,
        size: 'primery' as const,
        onClick: () => router.back(),
        disabled: false,
        className: 'text-slate-800',
      }
    : paymentType !== 'BOOK'
      ? {
          children: payLoading ? <LoaderCircle className="animate-spin" /> : t('payment_confirm_book'),
          variant: 'secondary' as const,
          onClick: handleConfirmlOrder,
          size: 'primery' as const,
          disabled: payLoading,
        }
      : {
          children: payLoading ? <LoaderCircle className="animate-spin" /> : t('payment_confirm_pay'),
          variant: 'secondary' as const,
          size: 'primery' as const,
          onClick: handlePayOrder,
          disabled: payLoading,
        };
  return (
    <>
      <Dialog open={!!initiateNewOrder}>
        <DialogContent className="sm:max-w-[512px] mx-auto rounded-2xl sm:rounded-2xl gap-6">
          <DialogHeader className="gap-2">
            {' '}
            <span className="text-green-300">
              {formatTime(timeLeft)} {t('book__min')}
            </span>{' '}
            <DialogTitle className="text-xl lg:text-2xl font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50">
              {title}
            </DialogTitle>
            <DialogDescription asChild className="text-base text-slate-700 dark:text-slate-200">
              {description}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className={`grid grid-cols-1 gap-4 ${!isError ? 'md:grid-cols-2' : ''}`}>
            {!isError && (
              <Button
                variant={'outline'}
                size={'primery'}
                onClick={handleCancelOrder}
                disabled={payLoading}
                className="text-slate-800"
              >
                Скасувати <TicketX />
              </Button>
            )}
            <Button {...actionButtonProps} variant={'secondary'} size={'primery'} className="text-black" />
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={openPriceChange} onOpenChange={handleClosePriceChange}>
        <DialogContent className="sm:max-w-[480px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>{t('price_may_increase')}</DialogTitle>
            <DialogDescription>
              {t('price_may_increase')}{' '}
              <span className="text-green-300">
                {formatTime(timeLeft)} {t('book__min')}
              </span>{' '}
              {''}
              {t('book_within_2')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button size="secondary" variant="default" onClick={handleClosePriceChange}>
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[480px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>{t('still_online_title')}</DialogTitle>
            <DialogDescription>{t('still_online_description')}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              size={'secondary'}
              variant="default"
              onClick={() => {
                resetInitiateNewOrder();
                reset();
                router.back();
              }}
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
