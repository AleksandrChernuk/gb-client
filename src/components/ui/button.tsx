import { ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'cursor-pointer inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-2xl ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white text-sm font-bold tracking-normal leading-[16.8px] hover:bg-primary/90',
        destructive: 'bg-destructive hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-green-600 text-black text-sm font-bold tracking-normal leading-[16.8px] hover:bg-green-600/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        main: 'bg-green-600 hover:bg-green-600/80 text-base font-bold leading-6 tracking-normal text-black rounded-none rounded-br-[16px] rounded-bl-[16px] tablet:rounded-tl-none tablet:rounded-tr-[16px] tablet:rounded-bl-none',
      },
      size: {
        default: '',
        secondary:
          'py-2 px-6 tablet:py-4 rounded-full tablet:text-base font-bold leading-6 tracking-normal min-w-[168px] min-h-[48px] max-h-[48px] tablet:max-h-[52px]',
        primery:
          'w-full py-[14px] px-6 tablet:py-4 text-white rounded-full text-sm font-bold leading-6 tracking-normal tablet:max-h-[48px] tablet:max-h-[52px] laptop:max-h-[48px] laptop:max-h-[52px] ',
        lg: ' ',
        icon: ' ',
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
}: ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
