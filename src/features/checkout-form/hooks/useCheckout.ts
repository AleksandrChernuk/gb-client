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
  const [loading] = useState<boolean>(false);

  const adult = useSearchStore(useShallow((state) => state.adult));
  const children = useSearchStore(useShallow((state) => state.children));
  const from = useSearchStore(useShallow((state) => state.from));
  const to = useSearchStore(useShallow((state) => state.to));
  const ticket = useSelectedTickets(useShallow((state) => state.selectedTicket));
  const user = useUserStore(useShallow((state) => state.currentUser));
  const setInitiatePayment = useNewOrderResult((state) => state.setInitiateNewOrder);
  const setLoadingResult = useNewOrderResult((state) => state.setLoadingResult);

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
      setError('no data');
      toast.error('no data');
      return;
    }

    try {
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
    } catch (error) {
      console.log(error);
      toast.error('error');
    } finally {
      setLoadingResult(false);
    }
  };
  return { methods, onSubmit, error, loading };
}

export default useCheckout;
