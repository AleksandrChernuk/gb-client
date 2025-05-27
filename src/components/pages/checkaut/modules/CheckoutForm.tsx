'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useCurrentTicket } from '@/store/useCurrentTicket';
import Passengers from './Passengers';
import CheckoutCard from '../components/CheckoutCard';
import BookingSheet from './Booking';
import Contacts from './Contacts';
import Trip from './Trip';
import ToPay from './ToPay';
import Legal from './Legal';
import Payment from './Payment';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import SubmitButton from '../components/SubmitButton';
import { useLocale } from 'next-intl';
import { useSearchStore } from '@/store/useSearch';
import { useShallow } from 'zustand/react/shallow';
import { getProviderConfigByName } from '../helpers/providerFieldsConfig';
import { useUserStore } from '@/store/useStore';
import { getCheckoutSchemaForProvider } from '../helpers/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPassengers } from '../helpers/createPassList';
import { toast } from 'sonner';
import { checkout } from '@/actions/liqpay.checkout.actions';
import normalizeData from '../helpers/normalizeData';
import { z } from 'zod';

export default function CheckoutForm() {
  // const router = useRouter();
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
  // const selectedTicket = useCurrentTicket((state) => state.selectedTicket);
  // const resetCurrentTicket = useCurrentTicket((state) => state.resetCurrentTicket);
  // const isHydrated = useCurrentTicket((state) => state.isHydrated);

  const locale = useLocale();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const adult = useSearchStore(useShallow((state) => state.adult));
  const children = useSearchStore(useShallow((state) => state.children));
  const from = useSearchStore(useShallow((state) => state.from?.id));
  const to = useSearchStore(useShallow((state) => state.to?.id));
  const ticket = useCurrentTicket(useShallow((state) => state.selectedTicket));
  const user = useUserStore(useShallow((state) => state.currentUser));

  const providerConfig = useMemo(() => getProviderConfigByName(ticket), [ticket]);

  const defaultPassengers = useMemo(
    () => createPassengers(adult, children, providerConfig),
    [adult, children, providerConfig],
  );

  const schema = useMemo(
    () => getCheckoutSchemaForProvider(providerConfig, !!ticket?.details?.free_seats_map),
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

  // useEffect(() => {
  //   if (isHydrated && !selectedTicket) {
  //     router.replace('/');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedTicket]);

  const onSubmit = async (formData: z.infer<typeof schema>) => {
    localStorage.setItem('form', JSON.stringify(formData));

    if (!ticket || !from || !to) {
      console.log('no data');
      setError('no data');
      return;
    }

    if (formData.payment === 'card') {
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
      action: {
        label: 'Close',
        onClick: () => console.log('Close'),
      },
    });
  };

  return (
    <div>
      {Boolean(error) &&
        toast.error('error', {
          description: JSON.stringify(error),
          action: {
            label: 'Close',
            onClick: () => console.log('Close'),
          },
        })}
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <div className="grid grid-cols-1 laptop:grid-cols-[minmax(0,766px)_1fr] w-full relative gap-4">
            <div className="space-y-8 laptop:col-span-1">
              <Passengers />

              <CheckoutCard title={t('seat_reservation')} cardCount={2}>
                <BookingSheet />
              </CheckoutCard>

              <CheckoutCard title={t('contacts')} cardCount={3}>
                <Contacts />
              </CheckoutCard>

              <CheckoutCard title={t('payment')} cardCount={4}>
                <Payment />
              </CheckoutCard>
            </div>
            <div className="laptop:col-span-1 laptop:justify-self-end laptop:w-[542px] space-y-10">
              <CheckoutCard title={t('your_booking')}>
                <Trip />
              </CheckoutCard>

              <ToPay />

              <Legal />
              <SubmitButton loading={loading} />
            </div>
          </div>
        </FormProvider>
      </form>
    </div>
  );
}
