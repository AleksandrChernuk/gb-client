export const calendarStyles = {
  desctop: {
    months: 'flex flex-col',
    month: 'space-y-4 ',
    caption: 'flex justify-center relative items-center mb-2',
    caption_label: 'large_button text-black_2_for_text dark:text-gray_1',
    nav: 'space-x-1 flex items-center',
    nav_button:
      'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-transparent stroke-gray_1',

    nav_button_previous: 'absolute left-1 ',
    nav_button_next: 'absolute right-1',
    table: 'w-full border-collapse space-y-1',
    head_row: 'flex gap-2',
    head_cell: 'filter_input_normal_text text-gray_5 dark:text-gray_1 rounded-md w-9',
    row: 'flex w-full mt-2 gap-2',
    cell: 'h-9 w-9 rounded-full text-center text-base p-0 relative flex justify-center items-center [&:has([aria-selected])]:bg-transporante &:has([aria-selected])]:dark:text-gray_1 dark:text-gray_1  hover:bg-primary_1 hover:text-white   focus-within:relative focus-within:z-20',
    day: 'rounded-full h-9 w-9 p-0 text-sm font-medium tracking-normal leading-[21.6px]	aria-selected:opacity-100 hover:bg-primary_1 hover:text-white ',
    day_range_end: 'day-range-end',
    day_selected:
      'bg-primary_1 text-white hover:bg-primary_1 hover:text-white focus:bg-primary_1 focus:text-white',
    day_today: 'bg-transporante border-[2px] border-primary_1 text-accent-foreground',
    day_outside:
      ' day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
    day_disabled: 'text-muted-foreground opacity-50',
    day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
    day_hidden: 'invisible',
  },
  mobile: {
    row: 'flex w-full items-center justify-between mt-2 gap-2',
    head_row: 'flex w-full items-center justify-between gap-1 mobile:gap-2',
    months: 'flex flex-col gap-4',
    nav_button_previous: 'hidden',
    nav_button_next: 'hidden',
    cell: 'h-9 w-9 rounded-full text-center text-base p-0 relative flex justify-center items-center [&:has([aria-selected])]:bg-transporante &:has([aria-selected])]:dark:text-gray_1 dark:text-gray_1  hover:bg-primary_1 hover:text-white   focus-within:relative focus-within:z-20',

    day: 'rounded-full h-9 w-9 p-0 text-sm font-medium tracking-normal leading-[21.6px]	aria-selected:opacity-100 hover:bg-primary_1 hover:text-white ',

    caption:
      'flex justify-start relative items-center mb-4 text-sm text-black_2_for_text dark:text-grayy font-medium',
  },
}
