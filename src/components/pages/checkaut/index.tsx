import BackRouteButton from '@/components/shared/BackRouteButton';
import CheckoutForm from './modules/CheckoutForm';
import { Container } from '@/components/shared/Container';
import { getCookies } from '@/actions/cookie-actions';
import Timer from './components/Timer';
import { notFound } from 'next/navigation';

const Checkaut = async () => {
  const cookieRes = await getCookies('_p');

  if (!cookieRes) {
    notFound();
  }

  return (
    <main role="main" className="pb-16 grow bg-slate-50 dark:bg-slate-900">
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
          <CheckoutForm adult={cookieRes?.adult} child={cookieRes?.children} />
        </Container>
      </section>
    </main>
  );
};

export default Checkaut;
