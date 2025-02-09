"use client";

import { IconCalendar } from "@/components/icons/IconCalendar";
import React, { memo } from "react";
import { addMonths, format, isBefore, toDate } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { useDate } from '../../hooks/useDate';
import { DropdownWrapper, InputError, StartIcon } from '../../ui';
import { useShallow } from 'zustand/react/shallow';
import { useSearchStore } from '@/store/useSearch';
import useDateLocale from '@/hooks/useDateLocale';

export const DesktopDate = memo(() => {
  const { open, handleToggleOpen, handleSelectDate, handleBlur, inputRef } = useDate();
  const currentDate = useSearchStore(useShallow((state) => state.date));

  const month = useSearchStore((state) => state.month);
  const incrementMonth = useSearchStore((state) => state.incrementMonth);
  const decrementMonth = useSearchStore((state) => state.decrementMonth);
  const setMonth = useSearchStore((state) => state.setMonth);

  const { locale } = useDateLocale();

  return (
    <div role='dropdown-warapp' className='relative' onBlur={handleBlur}>
      <div
        className={`relative border-r border-gray_1 dark:border-black_2_for_text ${
          open && 'dark:border-r-transparent border-r-transparent'
        }`}
      >
        <StartIcon icon={<IconCalendar />} />
        <input
          ref={inputRef}
          type='button'
          value={format(currentDate || new Date(), 'dd MMMM ', { locale })}
          className='z-0 min-h-10 rounded-md size-full h-auto px-4 py-2 pl-8 tablet:px-9 laptop:px-12 tablet:py-4 outline-hidden bg-transparent focus:bg-gray_1 active:bg-gray_1 dark:focus:bg-black_2_for_text dark:active:bg-black_2_for_text placeholder-black dark:placeholder-gray_0 body_medium laptop:filter_input_medium_text text-black dark:text-grayy text-left text-nowrap truncate border-[1px] border-transparent'
          onClick={() => {
            handleToggleOpen();
          }}
        />
        <InputError inputError={null} />
      </div>

      <DropdownWrapper open={open}>
        <Calendar
          mode='single'
          month={month}
          onMonthChange={(e) => {
            if (isBefore(addMonths(e, 1), new Date())) return;
            if (isBefore(month, e)) {
              return incrementMonth();
            }
            decrementMonth();
          }}
          selected={toDate(currentDate) || new Date()}
          today={toDate(currentDate) || new Date()}
          onSelect={(value) => {
            if (value) {
              setMonth(toDate(value));
            }
            inputRef.current?.blur();
            handleSelectDate(value || new Date());
          }}
          disabled={{ before: new Date() }}
          className='rounded-none'
          classNames={{
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
          }}
          locale={locale}
        />
      </DropdownWrapper>
    </div>
  );
});

DesktopDate.displayName = "DesktopDate";
