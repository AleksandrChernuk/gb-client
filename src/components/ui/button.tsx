import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 outline-none aria-invalid:border-[#de2a1a] dark:aria-invalid:border-[#de2a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_svg]:shrink-0 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white text-sm font-bold leading-[16.8px] hover:bg-primary/90',
        destructive:
          'bg-red-400 text-white shadow-xs hover:bg-red-400/90 focus-visible:ring-red-400/20 dark:focus-visible:ring-red-400/40 dark:bg-red-400/60',
        outline:
          'w-full h-auto border border-slate-200 bg-inherit text-slate-800 dark:text-slate-50 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900 dark:hover:border-slate-700 active:border-slate-700 dark:active:border-slate-900 aria-selected:bg-green-300 aria-selected:text-white',
        secondary: 'bg-green-600 text-black text-sm font-bold leading-[16.8px] hover:bg-green-600/80',
        ghost: '',
        link: 'text-primary underline-offset-4 hover:underline',
        main: 'bg-green-600 hover:bg-green-600/80 text-base font-bold leading-6 tracking-normal text-black rounded-none rounded-br-[16px] rounded-bl-[16px] tablet:rounded-tl-none tablet:rounded-tr-[16px] tablet:rounded-bl-none',
      },
      size: {
        default: 'h-8 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: '',
        secondary:
          'py-2 px-6 tablet:py-4 tablet:text-base font-bold leading-6 tracking-normal rounded-full min-w-[168px] min-h-[48px] tablet:max-h-[52px]',
        primary:
          'w-full py-2 px-6  text-white rounded-full text-sm font-bold leading-6 tracking-normal tablet:max-h-[52px] laptop:max-h-[52px]',
        samll_primary:
          'w-full px-2 py-2 text-white rounded-full text-sm font-medium leading-6 tracking-normal tablet:max-h-[52px] laptop:max-h-[52px]',
        mainSearch: 'h-auto px-6 py-4 tablet:min-w-[120px] laptop:min-w-[187px] laptop:max-w-[187px] grow-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
