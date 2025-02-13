import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `flex h-auto w-full rounded-md border border-gray_1 dark:border-black_2_for_text dark:hover:bg-black  dark:hover:border-black_2_for_text dark:focus:bg-blackmode dark:focus:border-dark_bg  bg-background px-4 py-3 main_text_body text-text_prymery disabled:cursor-not-allowed disabled:opacity-50 outline-hidden hover:bg-grayy hover:border-gray_1 focus:border-black_2_for_text focus:bg-white`,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  }
)
Input.displayName = "Input"

export { Input }
