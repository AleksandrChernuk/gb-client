/* eslint-disable jsx-a11y/alt-text */
import { getImageProps } from 'next/image';

export default function HerowImg() {
  const common = { alt: 'Art Direction Example', sizes: '100vw', priority: true };
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: 1440,
    height: 875,
    quality: 100,
    src: '/images/herow_desctop.webp',
  });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 750,
    height: 1334,
    quality: 100,
    src: '/images/herow_mobile.webp',
  });

  return (
    <picture>
      <source media="(min-width: 1000px)" srcSet={desktop} />
      <source media="(min-width: 500px)" srcSet={mobile} />
      <img {...rest} style={{ width: '100%', height: 'auto' }} />
    </picture>
  );
}
