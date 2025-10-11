'use client';

import { useUserStore } from '@/shared/store/useUser';
import { useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { createPassengers } from '../helpers/createPassList';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import normalizeData from '../helpers/normalizeData';
import { toast } from 'sonner';
import { useSelectedTickets } from '@/shared/store/useSelectedTickets';
import { useNewOrderResult } from '@/shared/store/useOrderResult';
import { createOrder } from '@/shared/api/orders.actions';
import { FormData, PassengerFormData } from '@/features/checkout-form/types';
import { getCheckoutSchemaForProvider } from '@/features/checkout-form/config';
import { getProviderConfigByName } from '@/features/checkout-form/config/getProviderConfigByName';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

function useCheckout() {
  const locale = useLocale();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);

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

  const adult = selectedTicket?.adult ?? 0;
  const children = selectedTicket?.children ?? 0;
  const ticket = selectedTicket?.route;

  const providerConfig = useMemo(() => (ticket ? getProviderConfigByName(ticket) : null), [ticket]);

  const defaultPassengers = useMemo(() => {
    if (!providerConfig || !ticket) return [];

    const passengers = createPassengers(adult, children, providerConfig, ticket.ticketPricing.basePrice || 0);

    if (!Array.isArray(passengers)) {
      console.error('createPassengers did not return an array');
      return [];
    }

    return passengers as PassengerFormData[];
  }, [adult, children, providerConfig, ticket]);

  const schema = useMemo(() => {
    if (!providerConfig) return null;
    return getCheckoutSchemaForProvider(providerConfig, !!ticket?.details?.seatsMap?.length);
  }, [providerConfig, ticket]);

  const methods = useForm<FormData>({
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

  const onSubmit = async (formData: FormData) => {
    if (!ticket) {
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
          fromCityId: ticket.departure.fromLocation.id,
          toCityId: ticket.arrival.toLocation.id,
          locale,
          formData,
          route: ticket,
          user: user,
        }),
      );

      console.log(res);

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
      console.log(res);
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
