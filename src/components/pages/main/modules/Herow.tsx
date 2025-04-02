import MainSearch from '@/components/modules/main-search';
import { Container } from '@/components/shared/Container';
import Image from 'next/image';
import mob_full from '@/public/images/mob_full.avif';
import desc_full from '@/public/images/desc_full.avif';
// import MobileContainer from '@/components/shared/MobileContainer';
// import DesctopContainer from '@/components/shared/DesctopContainer';

export default function Herow() {
  return (
    <section>
      <div className="media_mobile">
        <Image
          src={mob_full}
          alt="People waiting for the bus"
          priority
          placeholder="blur"
          width={392}
          height={140}
          sizes="100vw"
          className="w-full"
        />
      </div>

      <div className="media_desc">
        <Image
          src={desc_full}
          alt="People waiting for the bus"
          placeholder="blur"
          priority
          width={1440}
          height={233}
          sizes="100vw"
          className="w-full"
        />
      </div>

      <Container size="l" className="-mt-10">
        <div>
          <h1 className="sr-only">Доступні квитки — комфортні подорожі</h1>
          <MainSearch />
        </div>
      </Container>
    </section>
  );
}
