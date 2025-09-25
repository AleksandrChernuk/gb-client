import { cn } from '@/shared/lib/utils';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function CardWrapper({ children, className }: Props) {
  return (
    <div
      className={cn(
        'rounded-2xl border bg-card text-card-foreground shadow-xs p-4 tablet:p-6 border-slate-200 dark:border-transparent',
        className,
      )}
    >
      {children}
    </div>
  );
}
