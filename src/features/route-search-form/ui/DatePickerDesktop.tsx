import React, { RefObject, Dispatch, SetStateAction } from 'react';
import { MainSearchInput } from './MainSearchInput';
import { IconCalendar } from '@/assets/icons/IconCalendar';
import { addMonths, format, isBefore, toDate } from 'date-fns';
import { Calendar } from '@/shared/ui/calendar';
import useDateLocale from '@/shared/hooks/useDateLocale';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleToggleOpen: () => void;
  handleSelectDate: (data: Date) => void;
  currentDate: string;
  month: Date;
  setMonth: (newMonth: Date) => void;
  incrementMonth: () => void;
  decrementMonth: () => void;
  handleBlur: (event: React.FocusEvent<HTMLDivElement>) => void;
  inputRef: RefObject<HTMLInputElement | null>;
};

export default function DatePickerDesktop({
  open,
  setOpen,
  handleSelectDate,
  currentDate,
  month,
  setMonth,
  incrementMonth,
  decrementMonth,
  inputRef,
}: Props) {
  const { locale } = useDateLocale();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <MainSearchInput
          classNames={`w-full border-r border-r-slate-200 dark:border-r-slate-700 ${open ? 'border-r-transparent dark:border-r-transparent' : ''}`}
          ref={inputRef}
          name="date"
          startIcon={<IconCalendar />}
          type="button"
          value={format(currentDate || new Date(), 'dd MMMM', { locale })}
        />
      </PopoverTrigger>
      <PopoverContent
        className="w-auto overflow-hidden p-3 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
        align="start"
      >
        <Calendar
          mode="single"
          month={month}
          onMonthChange={(e) => {
            if (isBefore(addMonths(e, 1), new Date())) return;
            if (isBefore(month, e)) {
              return incrementMonth();
            }
            decrementMonth();
          }}
          selected={currentDate ? toDate(currentDate) : new Date()}
          today={currentDate ? toDate(currentDate) : new Date()}
          onSelect={(value) => {
            if (value) {
              setMonth(toDate(value));
            }
            handleSelectDate(value || new Date());
            setOpen(false);
          }}
          disabled={{ before: new Date() }}
          locale={locale}
        />
      </PopoverContent>
    </Popover>
  );
}
