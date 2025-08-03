'use client';

import { FormProvider } from 'react-hook-form';
import { useTranslations } from 'next-intl';
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
import useCheckout from '../hooks/useCheckout';
import { ConfirmationDialog } from './ConfirmationDialog';

export default function CheckoutForm() {
  const { methods, onSubmit } = useCheckout();
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <FormProvider {...methods}>
        <ConfirmationDialog />
        <div className="relative grid grid-cols-1 laptop:grid-cols-3 gap-8">
          <div className="space-y-8 laptop:col-span-2">
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
          <div className="space-y-10 laptop:col-span-1">
            <CheckoutCard title={t('your_booking')}>
              <Trip />
            </CheckoutCard>

            <ToPay />

            <Legal />
            <SubmitButton />
          </div>
        </div>
      </FormProvider>
    </form>
  );
}
