import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-auto w-full rounded-md border border-gray_1 dark:border-black_2_for_text dark:hover:bg-black  dark:focus:bg-background  bg-background px-4 py-3 text-text_prymery_color disabled:cursor-not-allowed disabled:opacity-50 outline-hidden hover:bg-gray_1 focus:border-black focus:bg-white',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
)
Input.displayName = "Input"

export { Input }
