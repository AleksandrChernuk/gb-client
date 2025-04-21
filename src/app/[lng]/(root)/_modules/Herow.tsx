import MainSearch from '@/components/modules/main-search';
import { Container } from '@/components/shared/Container';
// import Image from 'next/image';
import { HerowImage } from './HerowImage';
import { Suspense } from 'react';

export default function Herow() {
  return (
    <section className="relative">
      <Suspense>
        {' '}
        <HerowImage />
      </Suspense>

      <Container size="l" className="-mt-10">
        <div>
          <h1 className="sr-only">Доступні квитки — комфортні подорожі</h1>
          <MainSearch />
        </div>
      </Container>
    </section>
  );
}
