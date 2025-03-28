import MainSearch from '@/components/modules/main-search';
import { Container } from '@/components/shared/Container';
import Image from 'next/image';
import mob_full from '@/public/images/mob_full.avif';
import desc_full from '@/public/images/desc_full.avif';

export default function Herow() {
  return (
    <section>
      <Image
        src={mob_full}
        alt="People waiting for the bus"
        priority
        placeholder="blur"
        width={392}
        height={140}
        sizes="(max-width: 767px) 100vw, 392px"
        className="w-full block tablet:hidden"
      />

      <Image
        src={desc_full}
        alt="People waiting for the bus"
        placeholder="blur"
        priority
        width={1440}
        height={233}
        sizes="(max-width: 767px) 0vw, 100vw"
        className="w-full hidden tablet:block "
      />

      <Container size="l" className="-mt-10">
        <div>
          <h1 className="sr-only">Доступні квитки — комфортні подорожі</h1>
          <MainSearch />
        </div>
      </Container>
    </section>
  );
}
