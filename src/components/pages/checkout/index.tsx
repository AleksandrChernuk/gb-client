'use client';
import dynamic from 'next/dynamic';
import BackRouteButton from '@/components/shared/BackRouteButton';
import { Container } from '@/components/shared/Container';
import LoaderPage from './components/LoaderPage';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import Timer from './components/Timer';
import Cleanup from './components/Cleanup';

const CheckoutForm = dynamic(() => import('./modules/CheckoutForm'), {
  loading: () => <LoaderPage />,
  ssr: false,
});

const Checkaut = () => {
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);

  return (
    <main role="main" className="pb-16 grow bg-slate-50 dark:bg-slate-900 flex-1">
      <section className="h-full">
        <h1 className="sr-only">{t('h1')}</h1>
        <Container size="l" className="tablet:max-w-[960px] laptop:max-w-[1368px] h-full">
          <div className="my-4 laptop:my-8">
            <BackRouteButton />
          </div>
          <Timer />
          <Cleanup />
          <CheckoutForm />
        </Container>
      </section>
    </main>
  );
};

export default Checkaut;
