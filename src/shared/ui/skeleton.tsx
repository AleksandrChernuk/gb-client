import { cn } from '@/shared/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-green-50 dark:bg-slate-700', className)} {...props} />;
}

export { Skeleton };
