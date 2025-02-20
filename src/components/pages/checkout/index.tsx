"use client";

import BackButton from "@/components/shared/BackButton";
import { Container } from "@/components/shared/Container";
import Trip from "./modules/Trip";
import CheckoutCard from "./components/CheckoutCard";
import { FormProvider } from "react-hook-form";
import Passengers from "./modules/Passengers";
import { Button } from "@/components/ui/button";
import { useMainForm } from "./hooks/useCheckoutForm";
import Contacts from "./modules/Contacts";
import { useEffect } from "react";
import Booking from "./modules/Booking";
import Payment from "./modules/Payment";
import { useTranslations } from "next-intl";

export default function CheckoutPage({ adult, child }: { adult: string; child: string }) {
const { handleSubmit, onSubmit, methods } = useMainForm({ adult, child })
const t = useTranslations('new_order')

useEffect(() => {
  return () => {
    localStorage.removeItem('form')
  }
}, [])

return (
  <section>
    <Container size='l'>
      <div className='my-4 laptop:my-8'>
        <BackButton />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 laptop:grid-cols-[minmax(0,766px)_1fr] w-full relative gap-4'>
          <div className='space-y-8 laptop:col-span-1'>
            <FormProvider {...methods}>
              <Passengers />

              <CheckoutCard title={t('seat_reservation')} cardCount={2}>
                <Booking />
                {methods.formState.errors.selected_seats && (
                  <span className='text-sm font-medium text-red'>
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
            </FormProvider>
          </div>
          <div className='laptop:col-span-1 laptop:justify-self-end laptop:w-[542px] space-y-4'>
            <CheckoutCard title={t('your_booking')}>
              <Trip />
            </CheckoutCard>
            <Button variant={'default'} className='w-full p-4' type='submit'>
              {methods.watch('payment') !== 'card' ? t('book') : t('pay')}
            </Button>
          </div>
        </div>
      </form>
    </Container>
  </section>
)
}
