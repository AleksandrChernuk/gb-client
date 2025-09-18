import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type Props = {
  label: string;
  children: ReactNode;
  className?: string;
  listClassName?: string;
};

export default function DetailsList({ label, children, className = '', listClassName }: Props) {
  if (!children || (Array.isArray(children) && children.length === 0)) return null;

  return (
    <div className={`space-y-1 ${className}`}>
      <h5 className="text-sm font-bold tracking-normal leading-[18px] dark:text-green-100 text-green-300">{label}</h5>
      <div className={cn('flex flex-col gap-1', listClassName)}>{children}</div>
    </div>
  );
}
