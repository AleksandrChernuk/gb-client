'use client';

import { useCurrentTicket } from '@/store/useCurrentTicket';
import { useSearchStore } from '@/store/useSearch';
import { useUserStore } from '@/store/useStore';
import { useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { createPassengers } from '../helpers/createPassList';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale } from 'next-intl';
import { toast } from 'sonner';
import normalizeData from '../helpers/normalizeData';
import { checkout } from '@/actions/liqpay.checkout.actions';
import { z } from 'zod';
import { getCheckoutSchemaForProvider } from '../helpers/providerConfig/schemas';
import { getProviderConfigByName } from '../helpers/providerConfig';

function useCheckout() {
  const locale = useLocale();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const adult = useSearchStore(useShallow((state) => state.adult));
  const children = useSearchStore(useShallow((state) => state.children));
  const from = useSearchStore(useShallow((state) => state.from?.id));
  const to = useSearchStore(useShallow((state) => state.to?.id));
  const ticket = useCurrentTicket(useShallow((state) => state.selectedTicket));
  const user = useUserStore(useShallow((state) => state.currentUser));
  // const selectedTicket = useCurrentTicket((state) => state.selectedTicket);
  // const resetCurrentTicket = useCurrentTicket((state) => state.resetCurrentTicket);
  // const isHydrated = useCurrentTicket((state) => state.isHydrated);

  const providerConfig = useMemo(() => getProviderConfigByName(ticket), [ticket]);

  const defaultPassengers = useMemo(
    () => createPassengers(adult, children, providerConfig),
    [adult, children, providerConfig],
  );

  console.log('defaultPassengers', defaultPassengers);

  const schema = useMemo(
    () => getCheckoutSchemaForProvider(providerConfig, !!ticket?.details?.free_seats_map?.length),
    [providerConfig, ticket],
  );

  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      passengers: defaultPassengers,
      email: '',
      payment: null,
      accept_rules: false,
      phone: '',
      selected_seats: [],
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (formData: z.infer<typeof schema>) => {
    if (!ticket || !from || !to) {
      setError('no data');
      return;
    }

    if (formData.payment === 'PURCHASE') {
      try {
        setLoading(true);
        const { data, signature } = await checkout({
          order: normalizeData({
            from_city_id: from,
            to_city_id: to,
            locale,
            formData,
            route: ticket,
            user,
          }),
          result_url: `${process.env.NEXT_PUBLIC_API_URL}/${locale}/checkout-success`,
          locale,
        });

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://www.liqpay.ua/api/3/checkout';
        form.style.display = 'none';

        const addInput = (name: string, value: string) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = name;
          input.value = value;
          form.appendChild(input);
        };

        addInput('data', data);
        addInput('signature', signature);

        document.body.appendChild(form);
        form.submit();
      } catch (error) {
        setLoading(false);

        setError(error as string);
      } finally {
        setLoading(false);
      }
      return;
    }

    toast.info('ok', {
      description: JSON.stringify(formData),
    });
  };

  // useEffect(() => {
  //   if (isHydrated && !selectedTicket) {
  //     router.replace('/');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedTicket]);

  return { methods, onSubmit, error, loading };
}

export default useCheckout;
