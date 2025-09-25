import { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

type Props = {
  children: ReactNode;
  className?: string;
};

const CustomCard = ({ children, className }: Props) => {
  return (
    <div className={cn('p-4 tablet:p-6 bg-white dark:bg-slate-900 shadow-xs rounded-2xl', className)}>{children}</div>
  );
};

export default CustomCard;
