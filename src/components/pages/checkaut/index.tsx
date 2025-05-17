'use client';

import BackRouteButton from '@/components/shared/BackRouteButton';
import CheckoutForm from './modules/CheckoutForm';
import { Container } from '@/components/shared/Container';
import Timer from './components/Timer';
import { useSearchStore } from '@/store/useSearch';
import { useShallow } from 'zustand/react/shallow';
import { IconLoader } from '@/components/icons/IconLoader';

const Checkaut = () => {
  const isHydrated = useSearchStore(useShallow((state) => state.isHydrated));

  if (!isHydrated) {
    return (
      <main role="main" className="grow bg-slate-50 dark:bg-slate-900 flex-1 flex items-center justify-center">
        <section>
          <Container size="xs">
            <div className="py-5 size-12 tablet:size-20">
              <IconLoader />
            </div>
          </Container>
        </section>
      </main>
    );
  }

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
