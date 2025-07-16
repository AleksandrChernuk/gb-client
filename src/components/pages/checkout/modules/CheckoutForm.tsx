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
import { toast } from 'sonner';
import useCheckoutForm from '../hooks/useCheckout';

export default function CheckoutForm() {
  const { methods, onSubmit, error } = useCheckoutForm();
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);

  return (
    <div>
      {Boolean(error) &&
        toast.error('error', {
          description: JSON.stringify(error),
        })}
      <form onSubmit={methods.handleSubmit(onSubmit)} className="">
        <FormProvider {...methods}>
          <div className="relative grid grid-cols-1 laptop:grid-cols-[minmax(0,766px)_1fr] w-full gap-4">
            <div className="space-y-8 laptop:col-span-1  ">
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
            <div className="laptop:sticky laptop:top-0 laptop:h-screen laptop:w-[544px] space-y-10">
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
    </div>
  );
}
