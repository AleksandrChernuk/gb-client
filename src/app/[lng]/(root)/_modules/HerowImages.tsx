/* eslint-disable jsx-a11y/alt-text */
import { getImageProps } from 'next/image';
import desc from '@/assets/images/desc_full_2x.avif';
import mob from '@/assets/images/mob_full.avif';

export default function HerowImages() {
  const common = { alt: 'Art Direction Example', sizes: '100vw' };
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: 1440,
    height: 233,
    src: desc,
    loading: 'eager',
    decoding: 'sync',
    placeholder: 'blur',
  });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 750,
    height: 233,
    quality: 80,
    src: mob,
    loading: 'eager',
    decoding: 'sync',
    placeholder: 'blur',
  });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <source media="(min-width: 768px)" srcSet={mobile} />
      <img {...rest} style={{ width: '100%', height: 'auto' }} />
    </picture>
  );
}
