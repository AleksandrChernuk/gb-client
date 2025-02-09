'use client';

import BackButton from '@/components/shared/BackButton';
import { Container } from '@/components/shared/Container';
import Trip from './modules/Trip';
import CheckoutCard from './components/CheckoutCard';
import { FormProvider } from 'react-hook-form';
import Passengers from './modules/Passengers';
import { Button } from '@/components/ui/button';
import { useMainForm } from './hooks/useCheckoutForm';
import Contacts from './modules/Contacts';
// import { useCurrentRouteStore } from '@/store/useCurrentRoute';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

export default function NewOrderPage() {
  const { handleSubmit, onSubmit, methods } = useMainForm();
  // const сurrentRoute = useCurrentRouteStore((state) => state.сurrentRoute);
  // const isHydrated = useCurrentRouteStore((state) => state.isHydrated);
  // const router = useRouter();

  // useEffect(() => {
  //   if (isHydrated && !сurrentRoute) {
  //     router.push('/');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isHydrated, сurrentRoute]);

  return (
    <section>
      <h1 className='sr-only'>CheckoutPage</h1>
      <Container size='l'>
        <div className='my-4 laptop:my-8'>
          <BackButton />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 laptop:grid-cols-[minmax(0,766px)_1fr] w-full relative gap-4'>
            <div className='space-y-8 laptop:col-span-1'>
              <FormProvider {...methods}>
                <Passengers />

                <CheckoutCard title='Contacts' cardCount={3}>
                  <Contacts />
                </CheckoutCard>
              </FormProvider>
            </div>
            <div className='laptop:col-span-1 laptop:justify-self-end laptop:w-[542px] space-y-4'>
              <CheckoutCard title='Your booking'>
                <Trip />
              </CheckoutCard>
              <Button variant={'default'} className='w-full p-4' type='submit'>
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Container>
    </section>
  );
}
