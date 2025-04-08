/* eslint-disable jsx-a11y/alt-text */
import MainSearch from '@/components/modules/main-search';
import { Container } from '@/components/shared/Container';
import { getImageProps } from 'next/image';

export default function Herow() {
  const common = { alt: 'People waiting for the bus', sizes: '100vw' };
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: 1440,
    height: 233,
    quality: 100,

    src: '/images/desc_full_2x.avif',
  });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 750,
    height: 223,
    quality: 100,
    src: '/images/mob_full_2x.avif',
  });

  return (
    <section>
      <picture>
        <source media="(max-width: 767px)" srcSet={mobile} />
        <source media="(min-width: 768px)" srcSet={desktop} />
        <img {...rest} style={{ width: '100%', height: 'auto' }} loading="eager" />
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
