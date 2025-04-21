/* eslint-disable jsx-a11y/alt-text */
import { getImageProps } from 'next/image';

export const HerowImage = () => {
  const common = { alt: 'Art Direction Example', sizes: '100vw' };
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: 1440,
    height: 233,
    quality: 80,
    priority: true,
    src: '/images/desc_full_2x.avif',
  });

  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 768,
    height: 233,
    quality: 70,
    priority: true,
    src: '/images/mob_full_2x.avif',
  });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <source media="(max-width: 767px)" srcSet={mobile} />
      <img {...rest} style={{ width: '100%', height: 'auto' }} loading="eager" />
    </picture>
  );
};
