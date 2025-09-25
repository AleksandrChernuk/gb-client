import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 rounded-2xl cursor-pointer',
    'disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-[#de2a1a] dark:aria-invalid:border-[#de2a1a]',
    'outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    'transition-colors motion-safe:duration-200',
    'active:opacity-95',
  ].join(' '),
  {
    variants: {
      variant: {
        default:
          'bg-green-300 text-white text-sm font-bold leading-[16.8px] hover:bg-green-300/90 active:bg-green-300/85',

        destructive:
          'bg-red-400 text-white shadow-xs hover:bg-red-400/90 active:bg-red-400/85 focus-visible:ring-red-400/30 dark:focus-visible:ring-red-400/40 dark:bg-red-400/60',

        outline:
          'w-full h-auto border border-green-300 bg-inherit text-green-300 dark:text-slate-50 hover:bg-green-200/10 ' +
          'dark:border-green-300 dark:hover:bg-green-200/10 dark:hover:border-green-200 active:border-green-200 dark:active:border-green-400 ' +
          'aria-selected:bg-green-300 aria-selected:text-white',

        secondary:
          'bg-green-600 text-black text-sm font-bold leading-[16.8px] hover:bg-green-600/80 active:bg-green-600/75',

        ghost:
          'bg-transparent text-slate-800 dark:text-slate-50 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 active:bg-slate-200/50 dark:active:bg-slate-700/50',

        link: 'text-green-300 underline-offset-4 hover:underline active:opacity-90',

        main:
          'bg-green-600 hover:bg-green-600/80 active:bg-green-600/75 text-base font-bold leading-6 tracking-normal text-black ' +
          'rounded-none rounded-br-[16px] rounded-bl-[16px] tablet:rounded-tl-none tablet:rounded-tr-[16px] tablet:rounded-bl-none',
      },

      size: {
        default: 'h-8 px-4 has-[>svg]:px-3',
        sm: 'h-9 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-8 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-8 has-[>svg]:px-0',

        secondary:
          'py-2 px-6 tablet:py-4 tablet:text-base font-bold leading-6 tracking-normal rounded-full min-w-[168px] min-h-[48px] tablet:max-h-[52px]',

        primary:
          'w-full py-3 px-6 text-white rounded-full text-sm font-bold leading-6 tracking-normal tablet:max-h-[52px] laptop:max-h-[52px]',

        small_primary:
          'w-full px-2 py-3 text-white rounded-full text-sm font-medium leading-6 tracking-normal tablet:max-h-[52px] laptop:max-h-[52px]',

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
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };
