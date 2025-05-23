'use client';

import BackRouteButton from '@/components/shared/BackRouteButton';
import { Container } from '@/components/shared/Container';
import Timer from './components/Timer';

import dynamic from 'next/dynamic';
import { BusLoader } from '../../shared/BusLoader';

const CheckoutForm = dynamic(() => import('./modules/CheckoutForm'), {
  loading: () => (
    <main>
      <section className="flex items-center justify-center min-h-full">
        <BusLoader />
      </section>
    </main>
  ),
  ssr: false,
});

const Checkaut = () => {
  return (
    <main role="main" className="pb-16 grow bg-slate-50 dark:bg-slate-900 flex-1">
      <section>
        <Timer />
        <h1 className="sr-only">
          Бронюйте автобусні квитки до Європи з України швидко та зручно на GreenBus. Широкий вибір маршрутів, вигідні
          ціни, сучасні комфортабельні рейси та цілодобова підтримка.
        </h1>
        <Container size="l" className="tablet:max-w-[960px] laptop:max-w-[1368px]">
          <div className="my-4 laptop:my-8">
            <BackRouteButton />
          </div>
          <CheckoutForm />
        </Container>
      </section>
    </main>
  );
};

export default Checkaut;
