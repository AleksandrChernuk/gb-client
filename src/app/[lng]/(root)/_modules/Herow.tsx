import MainSearch from '@/components/modules/main-search';
import { Container } from '@/components/shared/Container';
// import Image from 'next/image';
import { HerowImage } from './HerowImage';

export default function Herow() {
  return (
    <section className="relative">
      {/* <picture>
        <source
          media="(max-width: 767px)"
          srcSet="/images/mob_full.avif 1x, /images/mob_full_2x.avif 2x"
          type="image/avif"
        />
        <source
          media="(min-width: 768px)"
          srcSet="/images/desc_full.avif 1x, /images/desc_full_2x.avif 2x"
          type="image/avif"
        />
        <Image
          src={'/images/desc_full_2x.avif'}
          alt="People waiting for the bus"
          width={1440}
          height={233}
          priority
          sizes="100vw"
          draggable={false}
          className="w-full h-auto"
        />
      </picture> */}

      <HerowImage />

      <Container size="l" className="-mt-10">
        <div>
          <h1 className="sr-only">Доступні квитки — комфортні подорожі</h1>
          <MainSearch />
        </div>
      </Container>
    </section>
  );
}
