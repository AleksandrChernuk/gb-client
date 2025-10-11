/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { liqpayInitiate } from '@/shared/api/liqpay.actions';
import { cancelOrder, confirmBook, smsValidateOrder } from '@/shared/api/orders.actions';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { useRouter } from '@/shared/i18n/routing';
import { useNewOrderResult } from '@/shared/store/useOrderResult';
import { ICancelBody, IConfirmOrderBody, ISmsValidateOrder } from '@/shared/types/order.actions.type';
import { useTranslations } from 'next-intl';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

const usePaymentConfirm = () => {
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
  const initiateNewOrder = useNewOrderResult((s) => s.initiateNewOrder);
  const setInitiateOtpVerify = useNewOrderResult((s) => s.setInitiateOtpVerify);

  const router = useRouter();

  const [payLoading, setPayLoading] = useState(false);
  const [smsValidationLoading, setSMSValidationLoading] = useState(false);

  const validateOrderData = useCallback(() => {
    if (!initiateNewOrder) {
      toast.error(t('order_data_missing'));
      return false;
    }
    return true;
  }, [initiateNewOrder]);

  const handleCancelOrder = useCallback(async () => {
    if (!validateOrderData()) return;

    if (!initiateNewOrder?.providerId || !initiateNewOrder?.providerOrderId) {
      toast.error(t('cancel_incomplete_data'));
      return;
    }

    try {
      const cancelParams: ICancelBody = {
        providerId: initiateNewOrder.providerId,
        providerOrderId: initiateNewOrder.providerOrderId,
      };

      await cancelOrder(cancelParams, initiateNewOrder?.myOrderId ?? '');
      toast.success(t('order_cancelled_success'));
    } catch (error) {
      console.error('Cancel order error:', error);
      toast.error(t('order_cancelled_fail'));
    } finally {
      router.back();
    }
  }, [initiateNewOrder, router, validateOrderData]);

  const handleSMSValidation = useCallback(
    async (pin: string) => {
      if (!pin?.trim()) {
        toast.error(t('enter_sms_code'));
        return;
      }

      if (
        !initiateNewOrder?.providerOrderId ||
        !initiateNewOrder?.providerId ||
        !initiateNewOrder?.myOrderId ||
        !initiateNewOrder?.customerPhone
      ) {
        toast.error(t('sms_incomplete_data'));
        return;
      }

      setSMSValidationLoading(true);

      try {
        const smsData: ISmsValidateOrder = {
          providerId: initiateNewOrder.providerId,
          providerOrderId: initiateNewOrder.providerOrderId,
          customerPhone: initiateNewOrder.customerPhone,
          validationCode: pin.trim(),
          locale: initiateNewOrder.locale || 'uk',
          myOrderId: initiateNewOrder.myOrderId,
        };

        const res = await smsValidateOrder(smsData);
        setInitiateOtpVerify(res);

        if (res?.status === 'success') {
          toast.success(t('sms_code_success'));
          router.push(`/payment-result?payment_id=${res.orderId}`);
        } else {
          toast.error(res?.message || t('sms_code_invalid'));
        }
      } catch (error) {
        console.error('SMS validation error:', error);
        toast.error(t('sms_code_error'));
      } finally {
        setSMSValidationLoading(false);
      }
    },
    [initiateNewOrder, setInitiateOtpVerify, router],
  );

  const handleConfirmOrder = useCallback(async () => {
    if (!validateOrderData()) return;

    if (
      !initiateNewOrder?.providerId ||
      !initiateNewOrder?.providerOrderId ||
      !initiateNewOrder?.myOrderId ||
      !initiateNewOrder?.customerPhone
    ) {
      toast.error(t('confirm_incomplete_data'));
      return;
    }

    setPayLoading(true);

    try {
      const confirmData: IConfirmOrderBody = {
        providerId: initiateNewOrder.providerId,
        providerOrderId: initiateNewOrder.providerOrderId,
        myOrderId: initiateNewOrder.myOrderId,
        customerPhone: initiateNewOrder.customerPhone,
        customerEmail: initiateNewOrder.customerEmail || '',
        locale: initiateNewOrder.locale || 'uk',
      };

      const res = await confirmBook(confirmData);

      if (res?.status !== 'success') {
        toast.error(res?.message || t('confirm_failed'));
        return;
      }

      if (res?.message === 'OTP code sent') {
        setInitiateOtpVerify(res);
        toast.info(t('sms_code_sent'));
        return;
      }

      if (res?.orderId) {
        router.push(`/payment-result?payment_id=${res.orderId}`);
        toast.success(t('booking_success'));
      } else {
        toast.error(t('booking_no_id'));
      }
    } catch (error) {
      console.error('Confirm order error:', error);
      toast.error(t('booking_error'));
    } finally {
      setPayLoading(false);
    }
  }, [initiateNewOrder, setInitiateOtpVerify, router, validateOrderData]);

  const handlePayOrder = useCallback(async () => {
    if (!validateOrderData()) return;

    if (!initiateNewOrder!.currency || !initiateNewOrder!.amount) {
      toast.error(t('payment_incomplete_data'));
      return;
    }

    setPayLoading(true);

    try {
      const paymentData = {
        amount: Number(initiateNewOrder!.amount),
        currency: initiateNewOrder!.currency,
        providerId: initiateNewOrder!.providerId || '',
        providerOrderId: initiateNewOrder!.providerOrderId || '',
        myOrderId: initiateNewOrder!.myOrderId || '',
        description: `${t('payment_order')} №${String(initiateNewOrder?.myOrderNumber || 0).padStart(9, '0')}`,
        locale: initiateNewOrder!.locale || 'uk',
        customerEmail: initiateNewOrder!.customerEmail || '',
      };

      const res = await liqpayInitiate(paymentData);

      if (res?.data && res?.signature) {
        createLiqPayForm(res.data, res.signature);
      } else {
        toast.error(t('payment_init_error'));
      }
    } catch (error) {
      console.error('Pay order error:', error);
      toast.error(t('payment_process_error'));
    } finally {
      setPayLoading(false);
    }
  }, [initiateNewOrder, validateOrderData]);

  const createLiqPayForm = useCallback((data: string, signature: string) => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://www.liqpay.ua/api/3/checkout';
    form.acceptCharset = 'utf-8';
    form.style.display = 'none';

    const inputData = document.createElement('input');
    inputData.type = 'hidden';
    inputData.name = 'data';
    inputData.value = data;
    form.appendChild(inputData);

    const inputSig = document.createElement('input');
    inputSig.type = 'hidden';
    inputSig.name = 'signature';
    inputSig.value = signature;
    form.appendChild(inputSig);

    document.body.appendChild(form);
    form.submit();

    setTimeout(() => {
      document.body.removeChild(form);
    }, 1000);
  }, []);

  return {
    handleCancelOrder,
    handlePayOrder,
    handleConfirmOrder,
    payLoading,
    smsValidationLoading,
    handleSMSValidation,
  };
};

export default usePaymentConfirm;
