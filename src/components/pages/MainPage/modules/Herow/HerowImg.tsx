import Image from 'next/image';
import mobileImg from '../../images/herow_mobile.webp';
import descImg from '../../images/herow_desctop.webp';

const HerowImg = () => {
  return (
    <div className='relative flex items-center justify-center w-full h-auto overflow-hidden'>
      <Image
        className='tablet:hidden'
        src={mobileImg}
        priority={true}
        alt='peaple wait bus'
        placeholder='blur'
        style={{
          width: '100%',
          height: 'auto',
        }}
      />

      <Image
        className='hidden tablet:block'
        src={descImg}
        priority={true}
        alt='peaple wait bus'
        placeholder='blur'
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
};

export default HerowImg;
