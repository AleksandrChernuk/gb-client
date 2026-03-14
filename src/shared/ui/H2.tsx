import { cn } from '@/shared/lib/utils';
import { ComponentProps } from 'react';

export const H2 = ({ className, ...props }: ComponentProps<'h2'>) => (
  <h2
    className={cn(
      'text-xl tablet:text-2xl laptop:text-[32px]',
      'font-medium leading-[1.2]',
      'my-2 tablet:my-4 laptop:mb-8',
      'text-slate-700 dark:text-slate-50',
      className,
    )}
    {...props}
  />
);
