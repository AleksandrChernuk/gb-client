import { cn } from '@/shared/lib/utils';
import { ComponentProps, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
} & ComponentProps<'section'>;

export default function Section({ children, className, ...props }: Props) {
  return (
    <section className={cn('py-10', className)} {...props}>
      {children}
    </section>
  );
}
