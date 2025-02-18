import { Container } from '@/components/shared/Container';
import HerowImg from './HerowImg';
import MainSearch from '@/components/modules/main-search';

export const Herow = () => {
  return (
    <section className='relative pt-0 tablet:pt-0'>
      <HerowImg />
      <Container
        size='l'
        className='static top-0 left-0 right-0 -translate-y-4 tablet:-translate-y-1/2'
      >
        <MainSearch />
      </Container>
    </section>
  );
};
