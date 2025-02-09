import Image from 'next/image';
import secondFooter from './images/second-footer.png';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

export default async function SecondFooter({ className }: Props) {
  return (
    <footer
      role='footer'
      className={cn('w-full h-auto bg-grayy dark:bg-dark_mode_main1', className)}
    >
      <Image
        src={secondFooter}
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
