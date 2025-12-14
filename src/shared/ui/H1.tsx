import { ComponentProps } from 'react';

type Props = ComponentProps<'h1'>;

export const H1 = ({ className = '', ...props }: Props) => {
  return (
    <h1
      className={`mb-4 text-xl font-bold tracking-normal leading-[28.8px]
      laptop:text-[32px] laptop:leading-[38.4px]
      text-slate-700 dark:text-slate-50 ${className}`}
      {...props}
    />
  );
};
