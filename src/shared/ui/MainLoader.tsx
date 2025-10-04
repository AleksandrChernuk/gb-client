import { cn } from '@/shared/lib/utils';
import { Loader } from 'lucide-react';
import React from 'react';

interface Props {
  size?: number;
  className?: string;
  wrapperClassName?: string;
}

const MainLoader = ({ size = 40, className, wrapperClassName }: Props) => {
  return (
    <div className={cn('flex items-center justify-center', wrapperClassName)}>
      <Loader className={cn('animate-spin stroke-green-200', className)} size={size} />
    </div>
  );
};

export default MainLoader;
