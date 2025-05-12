'use client';

import { CheckoutSchema } from '@/schemas/checkout.form.schema';
import { FormValues } from '@/types/checkout-from.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import { createPassengers } from '../helpers/createPassList';
import { checkout } from '@/actions/liqpay-checkout';
import normalizeData from '../helpers/normalizeData';
import { useSearchStore } from '@/store/useSearch';
import { useShallow } from 'zustand/react/shallow';
import { useLocale } from 'next-intl';
import { useCurrentTicketStore } from '@/store/useCurrentTicket';
import { useUserStore } from '@/store/useStore';

export function useCheckoutForm({ adult, child }: { adult: string; child: string }) {
  const adultCount = Number(adult);
  const childCount = Number(child);

  const [error, setError] = useState<string | null>(null);

  const from = useSearchStore(useShallow((state) => state.from?.id));
  const to = useSearchStore(useShallow((state) => state.to?.id));
  const ticket = useCurrentTicketStore(useShallow((state) => state.selectedTicket));
  const user = useUserStore(useShallow((state) => state.currentUser));

  const locale = useLocale();

  const defaultPassengers = useMemo(() => createPassengers(adultCount, childCount), [adultCount, childCount]);

  const methods = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      passengers: defaultPassengers,
      email: '',
      payment: 'booking',
      accept_rules: false,
      phone: '',
      selected_seats: [],
    },
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('form');
    if (!stored) return;

    try {
      methods.reset(JSON.parse(stored));
    } catch (err) {
      console.error('Ошибка парсинга form из localStorage:', err);
    }
  }, [methods]);

  useEffect(() => {
    const sub = methods.watch((data) => {
      localStorage.setItem('form', JSON.stringify(data));
    });
    return () => sub.unsubscribe();
  }, [methods]);

  const { handleSubmit } = methods;

  const onSubmit = async (formData: FormValues) => {
    console.log(formData);
    if (!ticket || !from || !to || !user) {
      console.log('no data');

      setError('no data');
      return;
    }

    if (formData.payment === 'card') {
      try {
        const { data, signature } = await checkout({
          order: normalizeData({ from_city_id: from, to_city_id: to, locale, formData, route: ticket, user }),
          result_url: `${process.env.NEXT_PUBLIC_API_URL}/${locale}/checkout-success`,
        });

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://www.liqpay.ua/api/3/checkout';
        form.style.display = 'none';
        form.target = '_blank';

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
        console.log(error);
        setError('error paymant');
      }
      return;
    }

    console.log(JSON.stringify(formData));
  };

  return { methods, onSubmit, handleSubmit, error };
}
