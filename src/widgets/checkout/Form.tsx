'use client';

import { FormProvider } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import useCheckout from '@/features/checkout-form/hooks/useCheckout';
import PassengersList from '@/widgets/checkout/ui/PassengersList';
import { ConfirmationDialog } from '@/widgets/checkout/ui/ConfirmationDialog';
import Contacts from '@/widgets/checkout/ui/Contacts';
import Payment from '@/widgets/checkout/ui/Payment';
import Trip from '@/widgets/checkout/ui/Trip';
import ToPay from '@/widgets/checkout/ui/ToPay';
import Legal from '@/widgets/checkout/ui/Legal';
import SubmitButton from '@/features/checkout-form/ui/SubmitButton';
import Booking from '@/widgets/checkout/ui/Booking';
import { useSelectedTickets } from '@/shared/store/useSelectedTickets';
import { useShallow } from 'zustand/react/shallow';
import CheckoutCard from '@/features/checkout-form/ui/CheckoutCard';

export default function CheckoutForm() {
  const { methods, onSubmit } = useCheckout();
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);

  const { selectedTicket, isHydrated } = useSelectedTickets(
    useShallow((state) => ({
      selectedTicket: state.selectedTicket,
      isHydrated: state.isHydrated,
    })),
  );

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <FormProvider {...methods}>
        <ConfirmationDialog />
        <div className="relative grid grid-cols-1 laptop:grid-cols-3 gap-8">
          <div className="space-y-8 laptop:col-span-2">
            <CheckoutCard title={t('passenger')} cardCount={1} needCard>
              <PassengersList />
            </CheckoutCard>

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
              <Trip isHydrated={isHydrated} route={selectedTicket?.route || null} />
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
