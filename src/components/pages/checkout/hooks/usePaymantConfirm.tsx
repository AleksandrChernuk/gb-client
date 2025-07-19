'use client';

import { liqpayInitiate } from '@/actions/liqpay.actions';
import { cancelOrder, confirmBook } from '@/actions/orders.actions';
import { useNewOrderResult } from '@/store/useOrderResult';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export const usePaymantConfirm = () => {
  const initiateNewOrder = useNewOrderResult((s) => s.initiateNewOrder);

  const router = useRouter();

  const [payLoading, setPayLoading] = useState(false);

  const handleCancelOrder = async () => {
    try {
      await cancelOrder(
        { providerId: initiateNewOrder?.providerId ?? '', providerOrderId: initiateNewOrder?.providerOrderId ?? '' },
        initiateNewOrder?.myOrderId ?? '',
      );
    } catch (error) {
      console.error(error);
      toast.error('Не вдалось скасувати');
    }
    router.back();
  };

  const handleConfirmlOrder = async () => {
    setPayLoading(true);
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
      setPayLoading(false);
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

  return { handleCancelOrder, handlePayOrder, handleConfirmlOrder, payLoading };
};
