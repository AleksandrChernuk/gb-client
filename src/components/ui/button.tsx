import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-2xl ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white button_mobile  hover:bg-primary/90',
        destructive: 'bg-destructive hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-black button_mobile  hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        main: 'bg-secondary hover:bg-secondary/80 h5 text-black rounded-none rounded-br-[16px] rounded-bl-[16px] tablet:rounded-tl-none tablet:rounded-tr-[16px] tablet:rounded-bl-none',
      },
      size: {
        default: '',
        secondary:
          'py-2 px-6 tablet:py-4 rounded-full tablet:h5 min-w-[168px] max-h-[48px] tablet:max-h-[52px]',
        sm: ' ',
        lg: ' ',
        icon: ' ',
        mainSearch:
          'h-auto px-6 py-4   tablet:min-w-[120px] laptop:min-w-[187px] laptop:max-w-[187px] grow-0 ',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
