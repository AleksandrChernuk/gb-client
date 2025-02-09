"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
 
import { cn } from "@/lib/utils";
import { IconSwitchSun } from "../icons/IconSwitchSun";
import { IconSwitchMoon } from "../icons/IconSwitchMoon";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-black_2_for_text data-[state=unchecked]:bg-gray_1",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "flex items-center justify-center  pointer-events-none h-6 w-6 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1",
      )}
    >
      <span className="">
        {props.checked ? (
          <IconSwitchMoon className={"hidden dark:block w-4 h-4 "} />
        ) : (
          <IconSwitchSun className={"block dark:hidden w-5 h-5"} />
        )}
      </span>
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
