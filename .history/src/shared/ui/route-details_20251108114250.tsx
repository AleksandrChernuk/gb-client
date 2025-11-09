import { cn } from '@/shared/lib/utils';
import { ReactNode } from 'react';

type TRouteDetailsSection = {
  label: string;
  children: ReactNode | null | undefined;
  className?: string;
  listClassName?: string;
};

type TRouteDetailsField = {
  className?: string;
  children: ReactNode;
};

export const RouteDetailsSection = ({ label, children, className, listClassName }: TRouteDetailsSection) => {
  if (!children || (Array.isArray(children) && children.length === 0)) return null;

  return (
    <div className={`space-y-1 ${className}`}>
      <h5 className="text-sm font-bold tracking-normal leading-[18px] text-green-300">{label}</h5>
      <div className={cn('flex flex-col gap-1', listClassName)}>{children}</div>
    </div>
  );
};

export const RouteDetailsField = ({ className, children }: TRouteDetailsField) => {
  return (
    <div className={cn('text-wrap text-slate-400 dark:text-slate-200 text-xs font-normal tracking-normal ', className)}>
      {children}
    </div>
  );
};
