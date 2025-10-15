import { cn } from '@/shared/lib/utils';

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
      <div className="flex space-x-2">
        <span className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}
