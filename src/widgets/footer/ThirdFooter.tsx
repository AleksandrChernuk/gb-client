import Image from 'next/image';
import thirdFooter from '@/assets/images/third-footer.webp';

export default async function ThirdFooter() {
  return (
    <footer role="footer" className="w-full  bg-slate-50 dark:bg-slate-900">
      <Image
        src={thirdFooter}
        priority
        alt="peaple wait bus"
        placeholder="empty"
        width={1440}
        height={232}
        sizes="100vw"
        draggable={false}
        className="w-full"
      />
    </footer>
  );
}
