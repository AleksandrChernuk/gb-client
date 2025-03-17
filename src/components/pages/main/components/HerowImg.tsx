import { getImageProps } from 'next/image';
import desc from '../images/herow_desctop.avif';
import mob from '../images/herow_mobile.avif';

export default function HerowImg() {
  const common = { alt: 'Art Direction Example', sizes: '100vw' };
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: 2880,
    height: 540,
    src: desc,
  });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 1440,
    height: 470,
    src: mob,
  });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <source media="(min-width: 767px)" srcSet={mobile} />
      <img {...rest} alt={common.alt} style={{ width: '100%', height: 'auto' }} />
    </picture>
  );
}
