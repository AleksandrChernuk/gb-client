"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-0', className)}
      classNames={{
        months: 'flex flex-col',
        month: 'space-y-4',
        caption: 'flex justify-center relative items-center mb-7',
        caption_label: 'text-md font-bold',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-transparent'
        ),
        nav_button_previous: 'absolute left-1 ',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex gap-2',
        head_cell: 'text-muted-foreground rounded-md w-9 font-medium text-base',
        row: 'flex w-full mt-2 gap-2',
        cell: 'h-9 w-9 rounded-full text-center text-base p-0 relative flex justify-center items-center [&:has([aria-selected])]:bg-transporante hover:bg-primary_1  focus-within:relative focus-within:z-20',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'rounded-full h-9 w-9 p-0 font-medium text-sm	aria-selected:opacity-100 hover:bg-primary_1'
        ),
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary_1 text-white hover:bg-primary_1 hover:text-white focus:bg-primary_1 focus:text-white',
        day_today: 'bg-transporante border-[2px] border-primary_1 text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft
            className={cn('h-5 w-5 stroke-gray_5 dark:stroke-gray_1', className)}
            {...props}
          />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight
            className={cn('h-5 w-5 stroke-gray_5 dark:stroke-gray_1', className)}
            {...props}
          />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
 