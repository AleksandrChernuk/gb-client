import Image from 'next/image';
import secondFooter from '@/assets/images/max.avif';
import { cn } from '@/shared/lib/utils';

type Props = {
  className?: string;
};

export default async function SecondFooter({ className }: Props) {
  return (
    <footer role="footer" className={cn('w-full h-auto bg-slate-50 dark:bg-slate-800', className)}>
      <Image
        src={secondFooter}
        priority
        alt="footer_2"
        width={1440}
        height={232}
        draggable={false}
        placeholder="empty"
        sizes="100vw"
        className="w-full"
      />
    </footer>
  );
}
