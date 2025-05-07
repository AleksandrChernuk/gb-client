'use client';

import { CheckoutSchema } from '@/schemas/checkout.form.schema';
import { FormValues } from '@/types/checkout-from.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import { createPassengers } from '../helpers/createPassList';
import { toast } from 'sonner';

export function useCheckoutForm({ adult, child }: { adult: string; child: string }) {
  const adultCount = Number(adult);
  const childCount = Number(child);

  const defaultPassengers = useMemo(() => createPassengers(adultCount, childCount), [adultCount, childCount]);

  const methods = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      passengers: defaultPassengers,
      email: '',
      payment: 'booking',
      accept_rules: false,
      processing_data: false,
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

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    console.log('Form Submitted:', data);
    toast('Form Submitted:', {
      description: JSON.stringify(data),
      action: {
        label: 'Undo',
        onClick: () => console.log('Close'),
      },
    });
  };

  return { methods, onSubmit, handleSubmit };
}
