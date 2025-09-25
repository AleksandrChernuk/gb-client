'use client';

import { FormProvider } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import useCheckout from '@/features/checkout-form/models/hooks/useCheckout';
import Passengers from '@/features/checkout-form/ui/Passengers';
import CheckoutCard from '@/entities/checkout/CheckoutCard';
import { ConfirmationDialog } from '@/features/checkout-form/ui/ConfirmationDialog';
import Contacts from '@/features/checkout-form/ui/Contacts';
import Payment from '@/features/checkout-form/ui/Payment';
import Trip from '@/features/checkout-form/ui/Trip';
import ToPay from '@/features/checkout-form/ui/ToPay';
import Legal from '@/features/checkout-form/ui/Legal';
import SubmitButton from '@/entities/checkout/SubmitButton';
import Booking from '@/features/checkout-form/ui/Booking';

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
              <Booking />
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
