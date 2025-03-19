/* eslint-disable jsx-a11y/alt-text */
import { getImageProps } from 'next/image';
import MobImg from '../images/herow_mobile.webp';
import DescImg from '../images/herow_desctop.webp';

export default function HerowImage() {
  const common = { alt: 'Art Direction Example', sizes: '100vw', priority: true };

  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: 1440,
    height: 230,
    quality: 100,
    src: DescImg,
  });

  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 750,
    height: 230,
    quality: 100,
    src: MobImg,
  });

  return (
    <picture>
      <source media="(min-width: 1000px)" srcSet={desktop} />
      <source media="(min-width: 500px)" srcSet={mobile} />
      <img {...rest} style={{ width: '100%', height: 'auto' }} />
    </picture>
  );
}
