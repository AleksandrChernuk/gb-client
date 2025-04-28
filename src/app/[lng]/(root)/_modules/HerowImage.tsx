/* eslint-disable jsx-a11y/alt-text */
// import { getImageProps } from 'next/image';
export const HerowImage = () => {
  return (
    <picture>
      <source
        media="(min-width: 768px)"
        srcSet={`
          /_next/image?url=%2Fimages%2Fdesc_full_2x.avif&w=640&q=80 640w,
          /_next/image?url=%2Fimages%2Fdesc_full_2x.avif&w=750&q=80 750w,
          /_next/image?url=%2Fimages%2Fdesc_full_2x.avif&w=828&q=80 828w,
          /_next/image?url=%2Fimages%2Fdesc_full_2x.avif&w=1080&q=80 1080w,
          /_next/image?url=%2Fimages%2Fdesc_full_2x.avif&w=1200&q=80 1200w,
          /_next/image?url=%2Fimages%2Fdesc_full_2x.avif&w=1920&q=80 1920w,
          /_next/image?url=%2Fimages%2Fdesc_full_2x.avif&w=2048&q=80 2048w,
          /_next/image?url=%2Fimages%2Fdesc_full_2x.avif&w=3840&q=80 3840w
        `}
        type="image/avif"
      />
      <source
        media="(max-width: 767px)"
        srcSet={`
          /_next/image?url=%2Fimages%2Fmob_full_2x.avif&w=640&q=70 640w,
          /_next/image?url=%2Fimages%2Fmob_full_2x.avif&w=750&q=70 750w,
          /_next/image?url=%2Fimages%2Fmob_full_2x.avif&w=828&q=70 828w,
          /_next/image?url=%2Fimages%2Fmob_full_2x.avif&w=1080&q=70 1080w,
          /_next/image?url=%2Fimages%2Fmob_full_2x.avif&w=1200&q=70 1200w,
          /_next/image?url=%2Fimages%2Fmob_full_2x.avif&w=1920&q=70 1920w,
          /_next/image?url=%2Fimages%2Fmob_full_2x.avif&w=2048&q=70 2048w,
          /_next/image?url=%2Fimages%2Fmob_full_2x.avif&w=3840&q=70 3840w
        `}
        type="image/avif"
      />
      <img
        alt="Art Direction Example"
        width={768}
        height={233}
        decoding="sync"
        sizes="100vw"
        src="/_next/image?url=%2Fimages%2Fmob_full_2x.avif&w=3840&q=70"
        className="w-full h-auto"
        loading="eager"
      />
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
