import Image from 'next/image';
import thirdFooter from '@/public/images/third-footer.avif';

export default async function ThirdFooter() {
  return (
    <footer role="footer" className="w-full h-auto bg-grayy dark:bg-dark_bg">
      <Image
        src={thirdFooter}
        priority
        alt="peaple wait bus"
        placeholder="empty"
        width={1440}
        height={232}
        sizes="100vw"
        className="w-full"
      />
    </footer>
  );
}
