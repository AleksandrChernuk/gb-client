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
import { getCheckoutSchemaForProvider } from '../helpers/providerConfig/schemas';
import { getProviderConfigByName } from '../helpers/providerConfig';
import { toast } from 'sonner';
import { createOrder } from '@/actions/orders.actions';
import { useSelectedTickets } from '@/store/useSelectedTickets';
import { useNewOrderResult } from '@/store/useOrderResult';

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
    () => createPassengers(adult, children, providerConfig, ticket?.ticket_pricing.base_price || 0),
    [adult, children, providerConfig, ticket?.ticket_pricing.base_price],
  );

  const schema = useMemo(
    () => getCheckoutSchemaForProvider(providerConfig, !!ticket?.details?.seats_map?.length),
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
      const res = await createOrder(
        normalizeData({
          from_city_id: from,
          to_city_id: to,
          locale,
          formData,
          route: ticket,
          user,
        }),
      );
      console.log(res);
      setInitiatePayment(res);
    } catch (error) {
      console.log(error);
      toast.error('error');
    } finally {
      setLoadingResult(false);
    }
  };

  const p = methods.watch('payment');
  console.log(p);

  return { methods, onSubmit, error, loading };
}

export default useCheckout;
