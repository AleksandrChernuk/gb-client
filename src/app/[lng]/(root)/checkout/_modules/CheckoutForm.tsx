'use client';

import { FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useCurrentTicketStore } from '@/store/useCurrentTicket';
import Passengers from './Passengers';
import CheckoutCard from './components/CheckoutCard';
import BookingSheet from './Booking';
import Contacts from './Contacts';
import Trip from './Trip';
import ToPay from './ToPay';
import Legal from './Legal';
import { useCheckoutForm } from './hooks/useCheckoutForm';
import Payment from './Payment';
import { useRouter } from '@/i18n/routing';

export default function CheckoutForm({ adult, child }: { adult: string; child: string }) {
  const { handleSubmit, onSubmit, methods } = useCheckoutForm({ adult, child });
  const selectedTicket = useCurrentTicketStore((state) => state.selectedTicket);
  const resetCurrentTicket = useCurrentTicketStore((state) => state.resetCurrentTicket);
  const isHydrated = useCurrentTicketStore((state) => state.isHydrated);
  const router = useRouter();
  const t = useTranslations('new_order');

  useEffect(() => {
    return () => {
      localStorage.removeItem('form');
      localStorage.removeItem('timer');
      resetCurrentTicket();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isHydrated && !selectedTicket) {
      router.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTicket]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...methods}>
        <div className="grid grid-cols-1 laptop:grid-cols-[minmax(0,766px)_1fr] w-full relative gap-4">
          <div className="space-y-8 laptop:col-span-1">
            <Passengers />

            <CheckoutCard title={t('seat_reservation')} cardCount={2}>
              <BookingSheet />
              {methods.formState.errors.selected_seats && (
                <span className="text-sm font-medium text-red-50">
                  {methods.formState.errors.selected_seats?.message}
                </span>
              )}
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

            <Button variant={'default'} className="w-full p-4" type="submit">
              {methods.watch('payment') !== 'card' ? t('book') : t('pay')}
            </Button>
          </div>
        </div>
      </FormProvider>
    </form>
  );
}
