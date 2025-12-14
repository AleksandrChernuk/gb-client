import { cn } from '@/shared/lib/utils';
import { ComponentProps, ReactNode } from 'react';

type Props = { children: ReactNode; className?: string } & ComponentProps<'h1'>;

export default function Main({ className, children, ...props }: Props) {
  return (
    <main className={cn('"bg-slate-50 dark:bg-slate-900 flex-1', className)} {...props}>
      {children}
    </main>
  );
}
