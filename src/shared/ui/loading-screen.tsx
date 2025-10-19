import { cn } from '@/shared/lib/utils';
import { LoaderCircle } from 'lucide-react';

interface LoadingScreenProps {
  className?: string;
}

export function LoadingScreen({ className }: LoadingScreenProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 z-20 flex items-center justify-center backdrop-blur-[2px] overflow-hidden rounded-lg',
        className,
      )}
    >
      <LoaderCircle role="status" aria-label="Loading" className={'size-10 animate-spin stroke-green-200'} />
    </div>
  );
}
