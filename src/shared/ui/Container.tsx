import { FC, PropsWithChildren } from 'react';
import { cn } from '@/shared/lib/utils';

interface ContainerProps {
  className?: string;
  size: 'xs' | 's' | 'sm' | 'm' | 'l';
}

export const Container: FC<PropsWithChildren<ContainerProps>> = ({ className, size, children }) => {
  const sizeClasses = {
    xs: 'max-w-[656px]',
    s: 'max-w-[805px]',
    sm: 'max-w-[960px]',
    m: 'max-w-[1156px]',
    l: 'max-w-[1368px]',
  };

  return <div className={cn('mx-auto px-5', sizeClasses[size], className)}>{children}</div>;
};
