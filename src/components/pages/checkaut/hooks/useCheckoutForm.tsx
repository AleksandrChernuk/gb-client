// 'use client';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { useEffect, useMemo, useState } from 'react';
// import { checkout } from '@/actions/liqpay.checkout.actions';
// import normalizeData from '../helpers/normalizeData';
// import { useSearchStore } from '@/store/useSearch';
// import { useShallow } from 'zustand/react/shallow';
// import { useLocale } from 'next-intl';
// import { useCurrentTicket } from '@/store/useCurrentTicket';
// import { useUserStore } from '@/store/useStore';
// import { toast } from 'sonner';
// import { createPassengers } from '../helpers/createPassList';
// import { getProviderConfigByName } from '../helpers/providerFieldsConfig';
// import { getCheckoutSchemaForProvider } from '../helpers/schema';
// import { z } from 'zod';

// export function useCheckoutForm() {
//   const locale = useLocale();

//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const adult = useSearchStore(useShallow((state) => state.adult));
//   const children = useSearchStore(useShallow((state) => state.children));
//   const from = useSearchStore(useShallow((state) => state.from?.id));
//   const to = useSearchStore(useShallow((state) => state.to?.id));
//   const ticket = useCurrentTicket(useShallow((state) => state.selectedTicket));
//   const user = useUserStore(useShallow((state) => state.currentUser));
//   const providerConfig = getProviderConfigByName(ticket);

//   const defaultPassengers = useMemo(
//     () => createPassengers(adult, children, providerConfig),
//     [adult, children, providerConfig],
//   );

//   const schema = useMemo(
//     () => getCheckoutSchemaForProvider(providerConfig, !!ticket?.details?.free_seats_map),
//     [providerConfig, ticket],
//   );

//   const methods = useForm<z.infer<typeof schema>>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       passengers: defaultPassengers,
//       email: '',
//       payment: null,
//       accept_rules: false,
//       phone: '',
//       selected_seats: [],
//     },
//     mode: 'onChange',
//   });

//   // const throttledSave = useThrottledCallback((data) => {
//   //   localStorage.setItem('form', JSON.stringify(data));
//   // }, 800);

//   // useEffect(() => {
//   //   if (typeof window === 'undefined') return;
//   //   const stored = localStorage.getItem('form');
//   //   if (!stored) return;

//   //   try {
//   //     methods.reset(JSON.parse(stored));
//   //   } catch (err) {
//   //     console.error('Ошибка парсинга form из localStorage:', err);
//   //   }
//   // }, [methods]);

//   // useEffect(() => {
//   //   const sub = methods.watch((data) => {
//   //     throttledSave(data);
//   //   });
//   //   return () => sub.unsubscribe();
//   // }, [methods, throttledSave]);

//   const { handleSubmit } = methods;

//   const onSubmit = async (formData: z.infer<typeof CheckoutSchema>) => {
//     localStorage.setItem('form', JSON.stringify(formData));

//     if (!ticket || !from || !to) {
//       console.log('no data');
//       setError('no data');
//       return;
//     }

//     if (formData.payment === 'card') {
//       try {
//         setLoading(true);
//         const { data, signature } = await checkout({
//           order: normalizeData({
//             from_city_id: from,
//             to_city_id: to,
//             locale,
//             formData,
//             route: ticket,
//             user,
//           }),
//           result_url: `${process.env.NEXT_PUBLIC_API_URL}/${locale}/checkout-success`,
//           locale,
//         });

//         const form = document.createElement('form');
//         form.method = 'POST';
//         form.action = 'https://www.liqpay.ua/api/3/checkout';
//         form.style.display = 'none';

//         const addInput = (name: string, value: string) => {
//           const input = document.createElement('input');
//           input.type = 'hidden';
//           input.name = name;
//           input.value = value;
//           form.appendChild(input);
//         };

//         addInput('data', data);
//         addInput('signature', signature);

//         document.body.appendChild(form);
//         form.submit();
//       } catch (error) {
//         setLoading(false);
//         setError(error as string);
//       } finally {
//         setLoading(false);
//       }
//       return;
//     }
//     toast.info('ok', {
//       description: JSON.stringify(formData),
//       action: {
//         label: 'Close',
//         onClick: () => console.log('Close'),
//       },
//     });
//   };

//   return { methods, onSubmit, handleSubmit, error, loading };
// }
