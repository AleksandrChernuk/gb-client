/* eslint-disable jsx-a11y/alt-text */
import { getImageProps } from 'next/image';

export default function HerowImg() {
  const common = { alt: 'Art Direction Example', sizes: '100vw', priority: true };
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: 1440,
    height: 263,
    src: '/images/herow_desctop.avif',
  });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 744,
    height: 223,
    src: '/images/herow_mobile.avif',
  });

  return (
    <picture>
      <source media="(min-width: 1000px)" srcSet={desktop} />
      <source media="(min-width: 500px)" srcSet={mobile} />
      <img {...rest} style={{ width: '100%', height: 'auto' }} />
    </picture>
  );
}
