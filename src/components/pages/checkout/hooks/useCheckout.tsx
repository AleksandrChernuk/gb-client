'use client';

import { useSearchStore } from '@/store/useSearch';
import { useUserStore } from '@/store/useUser';
import { useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { createPassengers } from '../helpers/createPassList';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale } from 'next-intl';
import normalizeData from '../helpers/normalizeData';
import { z } from 'zod';
import { getCheckoutSchemaForProvider } from '../providerConfig/schemas';
import { getProviderConfigByName } from '../providerConfig';
import { toast } from 'sonner';
import { useSelectedTickets } from '@/store/useSelectedTickets';
import { useNewOrderResult } from '@/store/useOrderResult';
import { createOrder } from '@/actions/orders.actions';

function useCheckout() {
  const locale = useLocale();
  const [error, setError] = useState<string | null>(null);
  const [loading] = useState<boolean>(false);

  const adult = useSearchStore(useShallow((state) => state.adult));
  const children = useSearchStore(useShallow((state) => state.children));
  const from = useSearchStore(useShallow((state) => state.from?.id));
  const to = useSearchStore(useShallow((state) => state.to?.id));
  const ticket = useSelectedTickets(useShallow((state) => state.selectedTicket));
  const user = useUserStore(useShallow((state) => state.currentUser));
  const setInitiatePayment = useNewOrderResult((state) => state.setInitiateNewOrder);
  const setLoadingResult = useNewOrderResult((state) => state.setLoadingResult);
  const providerConfig = useMemo(() => getProviderConfigByName(ticket), [ticket]);
  const defaultPassengers = useMemo(
    () => createPassengers(adult, children, providerConfig, ticket?.ticketPricing.basePrice || 0),
    [adult, children, providerConfig, ticket?.ticketPricing.basePrice],
  );
  const schema = useMemo(
    () => getCheckoutSchemaForProvider(providerConfig, !!ticket?.details?.seatsMap?.length),
    [providerConfig, ticket],
  );
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      passengers: defaultPassengers,
      email: '',
      payment: 'BOOK',
      accept_rules: false,
      phone: '',
      selected_seats: [],
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (formData: z.infer<typeof schema>) => {
    if (!ticket || !from || !to) {
      setError('no data');
      toast.error('no data');
      return;
    }

    try {
      setLoadingResult(true);
      console.log(
        'normalizeData',
        normalizeData({
          fromCityId: from,
          toCityId: to,
          locale,
          formData,
          route: ticket,
          user,
        }),
      );
      const res = await createOrder(
        normalizeData({
          fromCityId: from,
          toCityId: to,
          locale,
          formData,
          route: ticket,
          user,
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
