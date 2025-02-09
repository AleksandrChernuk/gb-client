import Image from 'next/image';
import thirdFooter from './images/ThirdFooter.webp';

export default async function ThirdFooter() {
  return (
    <footer role='footer' className='w-full h-auto bg-grayy dark:bg-background_black_mode'>
      <Image
        src={thirdFooter}
        priority={true}
        alt='peaple wait bus'
        placeholder='empty'
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </footer>
  );
}
