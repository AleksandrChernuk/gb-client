import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import React from 'react';

interface Props {
  size?: number;
  className?: string;
  wrapperClassName?: string;
}

export const MainLoader = ({ size = 40, className, wrapperClassName }: Props) => {
  return (
    <div className={cn('flex items-center justify-center', wrapperClassName)}>
      <Loader className={cn('animate-spin stroke-green-300', className)} size={size} />
    </div>
  );
};
