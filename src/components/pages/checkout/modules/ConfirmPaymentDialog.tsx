'use client';

import { useState } from 'react';
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
import { cancelOrder, confirmBook } from '@/actions/orders.actions';
import { liqpayInitiate } from '@/actions/liqpay.actions';
import { useFormContext, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

export default function ConfirmPaymentDialog() {
  const { control } = useFormContext();
  const paymentType = useWatch({ control, name: 'payment' });
  const initiateNewOrder = useNewOrderResult((s) => s.initiateNewOrder);
  const router = useRouter();

  // состояния загрузки
  const [bookingLoading, setBookingLoading] = useState(false);
  const [payLoading, setPayLoading] = useState(false);

  const handleCancelOrder = async () => {
    try {
      await cancelOrder({ providerId: initiateNewOrder?.providerId ?? '' }, initiateNewOrder?.myOrderId ?? '');
    } catch (error) {
      console.error(error);
      toast.error('Не вдалось скасувати');
    }
    router.back();
  };

  const handleConfirmlOrder = async () => {
    setBookingLoading(true);
    try {
      const res = await confirmBook({ myOrderId: initiateNewOrder?.myOrderId ?? '' });
      if (res?.status !== 'success') {
        toast.error('Не вдалось забронювати');
        return;
      }
      toast.success('Заброньовано');
      router.push(`/payment-result?payment_id=${res.orderId}`);
    } catch (error) {
      console.error(error);
      toast.error('Помилка бронювання');
    } finally {
      setBookingLoading(false);
    }
  };

  const handlePayOrder = async () => {
    if (!initiateNewOrder) return;
    setPayLoading(true);
    try {
      const data = {
        amount: Number(initiateNewOrder.amount),
        currency: initiateNewOrder.currency,
        providerId: initiateNewOrder.providerId,
        providerOrderId: initiateNewOrder.providerOrderId,
        myOrderId: initiateNewOrder.myOrderId,
        description: initiateNewOrder.providerId,
        locale: initiateNewOrder.locale,
        customerEmail: initiateNewOrder.customerEmail,
      };
      const res = await liqpayInitiate(data);
      if (res.data && res.signature) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://www.liqpay.ua/api/3/checkout';
        form.acceptCharset = 'utf-8';

        const inputData = document.createElement('input');
        inputData.type = 'hidden';
        inputData.name = 'data';
        inputData.value = res.data;
        form.appendChild(inputData);

        const inputSig = document.createElement('input');
        inputSig.type = 'hidden';
        inputSig.name = 'signature';
        inputSig.value = res.signature;
        form.appendChild(inputSig);

        document.body.appendChild(form);
        form.submit();
      } else {
        toast.error('Помилка ініціалізації LiqPay');
      }
    } catch (error) {
      console.error(error);
      toast.error('Помилка оплати');
    } finally {
      setPayLoading(false);
    }
  };

  return (
    <Dialog open={!!initiateNewOrder}>
      <DialogContent className="sm:max-w-[512px] mx-auto px-5 rounded-2xl gap-6">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-xl lg:text-2xl font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50">
            {initiateNewOrder?.status !== 'error' ? 'Підтвердження оплати' : 'Сталася помилка'}
          </DialogTitle>
          <DialogDescription asChild className="text-sm text-slate-700 dark:text-slate-400">
            {initiateNewOrder?.status !== 'error' ? (
              <p>
                Фінальна вартість:{' '}
                <span className="font-medium">
                  {initiateNewOrder?.amount} {initiateNewOrder?.currency}
                </span>
              </p>
            ) : (
              <p>{initiateNewOrder.message}</p>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-2 gap-2">
          <Button variant="destructive" onClick={handleCancelOrder} disabled={bookingLoading || payLoading}>
            Скасувати
          </Button>

          {paymentType !== 'BOOK' ? (
            <Button variant="default" onClick={handleConfirmlOrder} disabled={bookingLoading || payLoading}>
              {bookingLoading ? <LoaderCircle className="animate-spin" /> : 'Бронювати'}
            </Button>
          ) : (
            <Button variant="default" onClick={handlePayOrder} disabled={bookingLoading || payLoading}>
              {payLoading ? <LoaderCircle className="animate-spin" /> : 'Оплатити'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
