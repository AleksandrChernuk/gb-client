'use client';

import { useUserStore } from '@/shared/store/useUser';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useSelectedTickets } from '@/shared/store/useSelectedTickets';
import { useNewOrderResult } from '@/shared/store/useOrderResult';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import useDefaultPassengers from '@/features/checkout-form/hooks/useDefaultPassengers';
import useCheckouSchema from '@/features/checkout-form/hooks/useCheckouSchema';
import { createOrder } from '@/shared/api/orders.actions';
import { normalizeData } from '@/features/checkout-form/lib/normalize/normalize.request.form';
import { TCheckoutForm } from '@/features/checkout-form/types/checkout.form.types';

function useCheckout() {
  const locale = useLocale();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);

  const { schema } = useCheckouSchema();

  const { defaultPassengers } = useDefaultPassengers();

  const { selectedTicket, updateRouteSeats } = useSelectedTickets(
    useShallow((state) => ({
      selectedTicket: state.selectedTicket,
      updateRouteSeats: state.updateRouteSeats,
    })),
  );
  const user = useUserStore(useShallow((state) => state.currentUser));

  const { setInitiateNewOrder, setLoadingResult } = useNewOrderResult(
    useShallow((state) => ({
      setInitiateNewOrder: state.setInitiateNewOrder,
      setLoadingResult: state.setLoadingResult,
    })),
  );

  const methods = useForm<TCheckoutForm>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: {
      passengers: defaultPassengers,
      email: user?.email || '',
      payment: 'BOOK',
      accept_rules: false,
      phone: '',
      selectedSeats: [],
    },
    mode: 'onSubmit',
    shouldFocusError: true,
  });

  const onSubmit = async (formData: TCheckoutForm) => {
    if (!selectedTicket) {
      const errorMsg = t('order_missing_data');
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    try {
      setError(null);
      setLoading(true);
      setLoadingResult(true);

      const res = await createOrder(
        normalizeData({
          fromCityId: selectedTicket.route.departure.fromLocation.id,
          toCityId: selectedTicket.route.arrival.toLocation.id,
          locale,
          formData,
          route: selectedTicket.route,
          user: user,
        }),
      );

      if (res?.status === 'error' && res?.message === 'Order total price not equal amount request!') {
        toast.error(res?.message);
        setError(t('order_price_mismatch_error'));
        return;
      }

      if (res?.status === 'error' && res?.message === 'Seat is not available') {
        toast.error(t('seat_unavailable_error'));

        if (Array.isArray(res?.freeSeats) && res.freeSeats.length > 0) {
          updateRouteSeats(res.freeSeats);

          methods.reset({ selectedSeats: [] });

          toast.info(t('seat_list_updated_title'), {
            description: t('seat_list_updated_description'),
            duration: 4000,
          });
        }

        return;
      }

      if (res?.status === 'error') {
        toast.error(t('order_price_mismatch_error'));
        setError(t('order_price_mismatch_error'));
        return;
      }

      setInitiateNewOrder(res);
    } catch (error: unknown) {
      console.error(t('order_create_failed'), error);
      const errorMessage = error instanceof Error ? error.message : t('order_create_system_error');
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      setLoadingResult(false);
    }
  };

  return { methods, onSubmit, error, loading };
}

export default useCheckout;
