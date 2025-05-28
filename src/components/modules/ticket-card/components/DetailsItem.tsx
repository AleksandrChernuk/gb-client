import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
};

export default function DetailsItem({ className, children }: Props) {
  return (
    <div
      className={cn(' text-wrap text-slate-400 dark:text-slate-200 text-xs font-normal tracking-normal ', className)}
    >
      {children}
    </div>
  );
}
