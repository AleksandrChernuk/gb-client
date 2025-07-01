export const calendarStyles = {
  desktop: {
    months: 'flex flex-col',
    month: 'space-y-4 ',
    caption: 'flex justify-center relative items-center mb-2',
    caption_label: 'text-lg font-bold tracking-normal leading-[21.6px] text-slate-700 dark:text-slate-200',
    nav: 'space-x-1 flex items-center',
    nav_button: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-transparent stroke-slate-200',

    nav_button_previous: 'absolute left-1 ',
    nav_button_next: 'absolute right-1',
    table: 'w-full border-collapse space-y-1',
    head_row: 'flex gap-2',
    head_cell: 'text-lg font-normal tracking-normal leading-[27px] text-[#212529] dark:text-slate-200 rounded-md w-9',
    row: 'flex w-full mt-2 gap-2',
    cell: 'h-9 w-9 rounded-full text-center text-base p-0 relative flex justify-center items-center [&:has([aria-selected])]:bg-transporante &:has([aria-selected])]:dark:text-slate-200 dark:text-slate-200  hover:bg-green-300 hover:text-white   focus-within:relative focus-within:z-20',
    day: 'rounded-full h-9 w-9 p-0 text-sm font-medium tracking-normal leading-[21.6px]	aria-selected:opacity-100 hover:bg-green-300 hover:text-white ',
    day_range_end: 'day-range-end',
    day_selected: 'bg-green-300 text-white hover:bg-green-300 hover:text-white focus:bg-green-300 focus:text-white',
    day_today: 'bg-transporante border-[2px] border-green-300 text-accent-foreground',
    day_outside:
      'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
    day_disabled: 'text-muted-foreground opacity-50',
    day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
    day_hidden: 'invisible',
  },
  mobile: {},
};
