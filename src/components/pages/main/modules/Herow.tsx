import MainSearch from '@/components/modules/main-search';
import { Container } from '@/components/shared/Container';

export default function Herow() {
  return (
    <section>
      <picture>
        <source media="(max-width: 767px)" srcSet="/images/mob_full.avif" />
        <source media="(min-width: 768px)" srcSet="/images/desc_full.avif" />
        <img
          src="/images/desc_full.avif"
          alt="People waiting for the bus"
          width="100%"
          height="auto"
          className="w-full"
          loading="eager"
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
