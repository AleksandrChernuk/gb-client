'use client';

import { useSearchStore } from '@/shared/store/useSearch';
import { useUserStore } from '@/shared/store/useUser';
import { useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { createPassengers } from '../helpers/createPassList';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale } from 'next-intl';
import normalizeData from '../helpers/normalizeData';
import { getCheckoutSchemaForProvider } from '../config/schemas';
import { getProviderConfigByName } from '../config';
import { toast } from 'sonner';
import { useSelectedTickets } from '@/shared/store/useSelectedTickets';
import { useNewOrderResult } from '@/shared/store/useOrderResult';
import { createOrder } from '@/shared/api/orders.actions';
import { FormData, PassengerFormData } from '@/features/checkout-form/types';

function useCheckout() {
  const locale = useLocale();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const adult = useSearchStore(useShallow((state) => state.adult));
  const children = useSearchStore(useShallow((state) => state.children));
  const from = useSearchStore(useShallow((state) => state.from));
  const to = useSearchStore(useShallow((state) => state.to));
  const ticket = useSelectedTickets(useShallow((state) => state.selectedTicket));
  const user = useUserStore(useShallow((state) => state.currentUser));
  const setInitiatePayment = useNewOrderResult((state) => state.setInitiateNewOrder);
  const setLoadingResult = useNewOrderResult((state) => state.setLoadingResult);
  console.log(ticket);
  const providerConfig = useMemo(() => getProviderConfigByName(ticket), [ticket]);

  const defaultPassengers = useMemo(
    () =>
      createPassengers(
        adult,
        children,
        providerConfig,
        ticket?.ticketPricing.basePrice || 0,
      ) as unknown as PassengerFormData[],
    [adult, children, providerConfig, ticket?.ticketPricing.basePrice],
  );

  const schema = useMemo(
    () => getCheckoutSchemaForProvider(providerConfig, !!ticket?.details?.seatsMap?.length),
    [providerConfig, ticket],
  );

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
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
    if (!ticket || !from || !to) {
      const errorMsg = 'Missing required data';
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
          fromCityId: from,
          toCityId: to,
          locale,
          formData,
          route: ticket,
          user: user,
        }),
      );

      setInitiatePayment(res);
    } catch (error: unknown) {
      console.error('Order creation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create order';
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
