'use client';

import { liqpayInitiate } from '@/shared/api/liqpay.actions';
import { cancelOrder, confirmBook, smsValidateOrder } from '@/shared/api/orders.actions';
import { useRouter } from '@/shared/i18n/routing';
import { useNewOrderResult } from '@/shared/store/useOrderResult';
import { ICancelBody, IConfirmOrderBody, ISmsValidateOrder } from '@/shared/types/order.actions.type';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export const usePaymentConfirm = () => {
  // Получаем данные инициированного заказа из глобального стейта
  const initiateNewOrder = useNewOrderResult((s) => s.initiateNewOrder);
  const setInitiateOtpVerify = useNewOrderResult((s) => s.setInitiateOtpVerify);

  const router = useRouter();

  // Состояния загрузки для UI
  const [payLoading, setPayLoading] = useState(false);
  const [smsValidationLoading, setSMSValidationLoading] = useState(false);

  const validateOrderData = useCallback(() => {
    if (!initiateNewOrder) {
      toast.error('Дані замовлення відсутні');
      return false;
    }
    return true;
  }, [initiateNewOrder]);

  // Обработчик отмены заказа
  const handleCancelOrder = useCallback(async () => {
    if (!validateOrderData()) return;

    // Проверяем наличие обязательных данных для отмены
    if (!initiateNewOrder?.providerId || !initiateNewOrder?.providerOrderId) {
      toast.error('Неповні дані для скасування замовлення');
      return;
    }

    try {
      // Формируем данные для отмены заказа
      const cancelParams: ICancelBody = {
        providerId: initiateNewOrder.providerId,
        providerOrderId: initiateNewOrder.providerOrderId,
      };

      // Вызываем API отмены заказа
      await cancelOrder(cancelParams, initiateNewOrder?.myOrderId ?? '');
      toast.success('Замовлення скасовано');
    } catch (error) {
      console.error('Cancel order error:', error);
      toast.error('Не вдалось скасувати замовлення');
    } finally {
      // Возвращаемся на предыдущую страницу независимо от результата
      router.back();
    }
  }, [initiateNewOrder, router, validateOrderData]);

  // Обработчик валидации SMS кода
  const handleSMSValidation = useCallback(
    async (pin: string) => {
      // Проверяем, что код введен
      if (!pin?.trim()) {
        toast.error('Введіть код підтвердження');
        return;
      }

      // Валидируем все обязательные поля для SMS проверки
      if (
        !initiateNewOrder?.providerOrderId ||
        !initiateNewOrder?.providerId ||
        !initiateNewOrder?.myOrderId ||
        !initiateNewOrder?.customerPhone
      ) {
        toast.error('Неповні дані для перевірки коду');
        return;
      }

      setSMSValidationLoading(true);

      try {
        // Подготавливаем данные для SMS валидации
        const smsData: ISmsValidateOrder = {
          providerId: initiateNewOrder.providerId,
          providerOrderId: initiateNewOrder.providerOrderId,
          customerPhone: initiateNewOrder.customerPhone,
          validationCode: pin.trim(),
          locale: initiateNewOrder.locale || 'uk',
          myOrderId: initiateNewOrder.myOrderId,
        };

        // Отправляем код на валидацию
        const res = await smsValidateOrder(smsData);
        setInitiateOtpVerify(res);

        // Обрабатываем результат валидации
        if (res?.status === 'success') {
          toast.success('Код підтверджено успішно');
          // Переходим на страницу результата платежа
          router.push(`/payment-result?payment_id=${res.orderId}`);
        } else {
          toast.error(res?.message || 'Невірний код підтвердження');
        }
      } catch (error) {
        console.error('SMS validation error:', error);
        toast.error('Сталася помилка при перевірці коду');
      } finally {
        setSMSValidationLoading(false);
      }
    },
    [initiateNewOrder, setInitiateOtpVerify, router],
  );

  // Обработчик подтверждения бронирования
  const handleConfirmOrder = useCallback(async () => {
    if (!validateOrderData()) return;

    // Проверяем все обязательные поля для подтверждения заказа
    if (
      !initiateNewOrder?.providerId ||
      !initiateNewOrder?.providerOrderId ||
      !initiateNewOrder?.myOrderId ||
      !initiateNewOrder?.customerPhone
    ) {
      toast.error('Неповні дані для підтвердження замовлення');
      return;
    }

    setPayLoading(true);

    try {
      // Формируем данные для подтверждения бронирования
      const confirmData: IConfirmOrderBody = {
        providerId: initiateNewOrder.providerId,
        providerOrderId: initiateNewOrder.providerOrderId,
        myOrderId: initiateNewOrder.myOrderId,
        customerPhone: initiateNewOrder.customerPhone,
        customerEmail: initiateNewOrder.customerEmail || '',
        locale: initiateNewOrder.locale || 'uk',
      };

      // Отправляем запрос на подтверждение
      const res = await confirmBook(confirmData);

      // Проверяем успешность операции
      if (res?.status !== 'success') {
        toast.error(res?.message || 'Не вдалось забронювати');
        return;
      }

      // Если требуется SMS подтверждение
      if (res?.message === 'OTP code sent') {
        setInitiateOtpVerify(res);
        toast.info('Код підтвердження надіслано на ваш телефон');
        return;
      }

      // Если бронирование прошло успешно без SMS
      if (res?.orderId) {
        router.push(`/payment-result?payment_id=${res.orderId}`);
        toast.success('Успішно заброньовано');
      } else {
        toast.error('Помилка: відсутній ідентифікатор замовлення');
      }
    } catch (error) {
      console.error('Confirm order error:', error);
      toast.error('Помилка при бронюванні');
    } finally {
      setPayLoading(false);
    }
  }, [initiateNewOrder, setInitiateOtpVerify, router, validateOrderData]);

  // Обработчик оплаты через LiqPay
  const handlePayOrder = useCallback(async () => {
    if (!validateOrderData()) return;

    // Проверяем наличие данных для оплаты
    if (!initiateNewOrder!.currency || !initiateNewOrder!.amount) {
      toast.error('Неповні дані для оплати');
      return;
    }

    setPayLoading(true);

    try {
      // Подготавливаем данные для инициализации платежа
      const paymentData = {
        amount: Number(initiateNewOrder!.amount),
        currency: initiateNewOrder!.currency,
        providerId: initiateNewOrder!.providerId || '',
        providerOrderId: initiateNewOrder!.providerOrderId || '',
        myOrderId: initiateNewOrder!.myOrderId || '',
        description: initiateNewOrder!.providerId || 'Payment',
        locale: initiateNewOrder!.locale || 'uk',
        customerEmail: initiateNewOrder!.customerEmail || '',
      };

      // Инициализируем платеж через LiqPay
      const res = await liqpayInitiate(paymentData);

      // Если получили данные для формы, создаем и отправляем форму
      if (res?.data && res?.signature) {
        createLiqPayForm(res.data, res.signature);
      } else {
        toast.error('Помилка ініціалізації платіжної системи');
      }
    } catch (error) {
      console.error('Pay order error:', error);
      toast.error('Помилка при обробці оплати');
    } finally {
      setPayLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initiateNewOrder, validateOrderData]);

  // Функция создания и отправки формы LiqPay
  const createLiqPayForm = useCallback((data: string, signature: string) => {
    // Создаем скрытую форму для перенаправления на LiqPay
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://www.liqpay.ua/api/3/checkout';
    form.acceptCharset = 'utf-8';
    form.style.display = 'none';

    // Добавляем поле с данными платежа
    const inputData = document.createElement('input');
    inputData.type = 'hidden';
    inputData.name = 'data';
    inputData.value = data;
    form.appendChild(inputData);

    // Добавляем поле с подписью
    const inputSig = document.createElement('input');
    inputSig.type = 'hidden';
    inputSig.name = 'signature';
    inputSig.value = signature;
    form.appendChild(inputSig);

    // Добавляем форму на страницу и отправляем
    document.body.appendChild(form);
    form.submit();

    // Очищаем DOM от формы через секунду
    setTimeout(() => {
      document.body.removeChild(form);
    }, 1000);
  }, []);

  // Возвращаем все обработчики и состояния для использования в компонентах
  return {
    handleCancelOrder,
    handlePayOrder,
    handleConfirmOrder,
    payLoading,
    smsValidationLoading,
    handleSMSValidation,
  };
};
