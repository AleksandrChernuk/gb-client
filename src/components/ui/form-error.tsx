import { cn } from '@/lib/utils';

export const FormErrorMassege = ({ className, ...props }: React.ComponentProps<'p'>) => {
  return <p className={cn(className, 'text-xs font-medium text-[#de2a1a]')}>{props.children}</p>;
};
