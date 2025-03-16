import Image from 'next/image';
// import mobileImg from '../images/herow_mobile.webp';
import descImg from '../images/main.webp';

export default function HerowImg() {
  return (
    <div className="relative flex items-center justify-center w-full max-h-[343px] overflow-hidden">
      <Image src={descImg} alt="peaple wait bus" />

      {/* <Image
        className="hidden tablet:block"
        src={descImg}
        priority={true}
        alt="peaple wait bus"
        placeholder="blur"
        style={{
          width: '100%',
          height: 'auto',
        }}
      /> */}
    </div>
  );
}
