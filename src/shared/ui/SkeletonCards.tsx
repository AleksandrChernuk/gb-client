import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { cn } from '@/shared/lib/utils';

type Props = {
  items: number;
  className?: string;
  skeletonClassName?: string;
};

export const SkeletonCards = ({ items, className, skeletonClassName }: Props) => {
  return (
    <div className={cn('space-y-6', className)}>
      {Array.from({ length: items }, (_, i) => (
        <Skeleton key={i} className={cn('w-full h-[184px] tablet:h-[192px] rounded-2xl', skeletonClassName)} />
      ))}
    </div>
  );
};
