'use client';

// import { liqpayInitiate } from '@/actions/liqpay.actions';
// import { cancelOrder, confirmBook, smsValidateOrder } from '@/actions/orders.actions';
import { useNewOrderResult } from '@/store/useOrderResult';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export const usePaymantConfirm = () => {
  const initiateNewOrder = useNewOrderResult((s) => s.initiateNewOrder);

  // const setInitiateOtpVerify = useNewOrderResult((s) => s.setInitiateOtpVerify);

  const router = useRouter();

  const [payLoading, setPayLoading] = useState(false);
  const [smsValidationoading, setSMSValidationoading] = useState(false);

  const handleCancelOrder = async () => {
    try {
      // await cancelOrder(
      //   { providerId: initiateNewOrder?.providerId ?? '', providerOrderId: initiateNewOrder?.providerOrderId ?? '' },
      //   initiateNewOrder?.myOrderId ?? '',
      // );
    } catch (error) {
      console.error(error);
      toast.error('Не вдалось скасувати');
    }
    router.back();
  };

  const handleSMSValidation = async (pin: string) => {
    if ((!pin.length && !initiateNewOrder?.providerOrderId) || !initiateNewOrder?.providerId) {
      toast.error('Неповні дані для перевірки коду');
      return;
    }
    setSMSValidationoading(true);
    try {
      // const data = {
      //   myOrderId: initiateNewOrder.myOrderId,
      //   providerId: initiateNewOrder.providerId,
      //   providerOrderId: initiateNewOrder.providerOrderId,
      //   customerPhone: initiateNewOrder.customerPhone || '',
      //   validationCode: pin,
      //   locale: initiateNewOrder.locale,
      // };
      // const res = await smsValidateOrder(data);
      // setInitiateOtpVerify(res);
      // if (res?.status === 'success') {
      //   toast.success('Код підтверджено');
      //   return router.push(`/payment-result?payment_id=${res.orderId}`);
      // } else {
      //   toast.error(res?.message || 'Код невірний');
      //   setSMSValidationoading(false);
      // }
    } catch (error) {
      console.error(error);
      toast.error('Сталася помилка при перевірці');
    } finally {
      setSMSValidationoading(false);
    }
  };

  const handleConfirmlOrder = async () => {
    setPayLoading(true);

    try {
      if (!initiateNewOrder) {
        toast.error('Помилка бронювання');
        return;
      }

      // const data = {
      //   providerId: initiateNewOrder?.providerId,
      //   providerOrderId: initiateNewOrder?.providerOrderId,
      //   myOrderId: initiateNewOrder?.myOrderId,
      //   customerPhone: initiateNewOrder?.customerPhone || '',
      //   customerEmail: initiateNewOrder?.customerEmail,
      //   locale: initiateNewOrder?.locale,
      // };

      // const res = await confirmBook(data);

      // if (res?.status !== 'success') {
      //   toast.error('Не вдалось забронювати');
      //   return;
      // }

      // if (res?.message === 'OTP code sent') {
      //   setInitiateOtpVerify(res);
      //   return;
      // }

      // router.push(`/payment-result?payment_id=${res.orderId}`);
      toast.success('Заброньовано');
    } catch (error) {
      console.error(error);
      toast.error('Помилка бронювання');
    } finally {
      setPayLoading(false);
    }
  };

  const handlePayOrder = async () => {
    // if (!initiateNewOrder) return;
    // setPayLoading(true);
    // try {
    //   const data = {
    //     amount: Number(initiateNewOrder.amount),
    //     currency: initiateNewOrder.currency,
    //     providerId: initiateNewOrder.providerId,
    //     providerOrderId: initiateNewOrder.providerOrderId,
    //     myOrderId: initiateNewOrder.myOrderId,
    //     description: initiateNewOrder.providerId,
    //     locale: initiateNewOrder.locale,
    //     customerEmail: initiateNewOrder.customerEmail,
    //   };
    //   const res = await liqpayInitiate(data);
    //   if (res.data && res.signature) {
    //     const form = document.createElement('form');
    //     form.method = 'POST';
    //     form.action = 'https://www.liqpay.ua/api/3/checkout';
    //     form.acceptCharset = 'utf-8';
    //     const inputData = document.createElement('input');
    //     inputData.type = 'hidden';
    //     inputData.name = 'data';
    //     inputData.value = res.data;
    //     form.appendChild(inputData);
    //     const inputSig = document.createElement('input');
    //     inputSig.type = 'hidden';
    //     inputSig.name = 'signature';
    //     inputSig.value = res.signature;
    //     form.appendChild(inputSig);
    //     document.body.appendChild(form);
    //     form.submit();
    //   } else {
    //     toast.error('Помилка ініціалізації LiqPay');
    //   }
    // } catch (error) {
    //   console.error(error);
    //   toast.error('Помилка оплати');
    // } finally {
    //   setPayLoading(false);
    // }
  };

  return {
    handleCancelOrder,
    handlePayOrder,
    handleConfirmlOrder,
    payLoading,
    smsValidationoading,
    handleSMSValidation,
  };
};
