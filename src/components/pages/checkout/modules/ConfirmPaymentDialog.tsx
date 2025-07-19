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
import { LoaderCircle } from 'lucide-react';
import { usePaymantConfirm } from '../hooks/usePaymantConfirm';

export default function ConfirmPaymentDialog() {
  const initiateNewOrder = useNewOrderResult((s) => s.initiateNewOrder);
  const { control } = useFormContext();
  const router = useRouter();

  const { handleCancelOrder, handlePayOrder, handleConfirmlOrder, payLoading } = usePaymantConfirm();
  const paymentType = useWatch({ control, name: 'payment' });

  // Универсальные значения для диалога
  const isError = !!initiateNewOrder?.error;
  const title = isError ? 'Сталася помилка' : 'Підтвердження оплати';
  const description = isError ? (
    initiateNewOrder?.error || 'Щось пішло не так.'
  ) : (
    <p>
      Фінальна вартість:{' '}
      <span className="font-medium">
        {initiateNewOrder?.amount} {initiateNewOrder?.currency}
      </span>
    </p>
  );

  const actionButtonProps = isError
    ? {
        children: 'До пошуку',
        variant: 'destructive' as const,
        onClick: () => router.back(),
        disabled: false,
      }
    : paymentType !== 'BOOK'
      ? {
          children: payLoading ? <LoaderCircle className="animate-spin" /> : 'Бронювати',
          variant: 'default' as const,
          onClick: handleConfirmlOrder,
          disabled: payLoading,
        }
      : {
          children: payLoading ? <LoaderCircle className="animate-spin" /> : 'Оплатити',
          variant: 'default' as const,
          onClick: handlePayOrder,
          disabled: payLoading,
        };

  return (
    <Dialog open={!!initiateNewOrder}>
      <DialogContent className="sm:max-w-[512px] mx-auto px-5 rounded-2xl gap-6">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-xl lg:text-2xl font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50">
            {title}
          </DialogTitle>
          <DialogDescription asChild className="text-sm text-slate-700 dark:text-slate-400">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-2 gap-2">
          {!isError && (
            <Button variant="destructive" onClick={handleCancelOrder} disabled={payLoading}>
              Скасувати
            </Button>
          )}
          <Button {...actionButtonProps} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
