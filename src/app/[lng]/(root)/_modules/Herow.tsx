import MainSearch from '@/components/modules/main-search';
import { Container } from '@/components/shared/Container';
import Image from 'next/image';
import imgDeac from '@/public/images/desc_full_2x.avif';

export default function Herow() {
  return (
    <section className="relative">
      <picture>
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
          src={imgDeac}
          alt="People waiting for the bus"
          width={1440}
          height={233}
          priority
          sizes="100vw"
          placeholder="blur"
          className="w-full h-auto"
        />
      </picture>

      <Container size="l" className="-mt-10">
        <div>
          <h1 className="sr-only">Доступні квитки — комфортні подорожі</h1>
          <MainSearch />
        </div>
      </Container>
    </section>
  );
}
