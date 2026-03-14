import { cn } from '@/shared/lib/utils';
import { ComponentProps } from 'react';

export const H1 = ({ className, ...props }: ComponentProps<'h1'>) => (
  <h1
    className={cn(
      'text-xl tablet:text-2xl laptop:text-[32px]',
      'font-bold leading-[1.2]',
      'my-4 tablet:my-8',
      'text-slate-700 dark:text-slate-50',
      className,
    )}
    {...props}
  />
);
