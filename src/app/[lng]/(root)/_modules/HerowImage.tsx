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
      <img {...rest} className="w-full h-auto" loading="eager" rel="preload" decoding="sync" />
    </picture>
  );
};

{
  /* <picture>
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
      </picture> */
}
