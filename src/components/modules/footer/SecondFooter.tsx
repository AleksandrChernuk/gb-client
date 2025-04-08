import Image from 'next/image';
import secondFooter from '@/public/images/second-footer.avif';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

export default async function SecondFooter({ className }: Props) {
  return (
    <footer role="footer" className={cn('w-full h-auto bg-slate-50 dark:bg-slate-800', className)}>
      <Image
        src={secondFooter}
        priority
        alt="peaple wait bus"
        width={1440}
        height={232}
        placeholder="empty"
        sizes="100vw"
        className="w-full"
      />
    </footer>
  );
}
