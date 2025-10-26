import React, { RefObject } from 'react';
import { MainSearchInput } from './MainSearchInput';
import { IconCalendar } from '@/assets/icons/IconCalendar';
import { addMonths, format, isBefore, toDate } from 'date-fns';
import { Calendar } from '@/shared/ui/calendar';
import useDateLocale from '@/shared/hooks/useDateLocale';

type Props = {
  open: boolean;
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
  handleToggleOpen,
  handleSelectDate,
  currentDate,
  month,
  setMonth,
  incrementMonth,
  decrementMonth,
  handleBlur,
  inputRef,
}: Props) {
  const { locale } = useDateLocale();

  return (
    <div role="dropdown-warapp" className="relative" onBlur={handleBlur}>
      <MainSearchInput
        classNames={`relative border-r border-slate-200 dark:border-slate-700 ${
          open && 'dark:border-r-transparent border-r-transparent'
        }`}
        ref={inputRef}
        name="date"
        startIcon={<IconCalendar />}
        type="button"
        value={format(currentDate || new Date(), 'dd MMMM ', { locale })}
        onClick={() => {
          handleToggleOpen();
        }}
      />

      {open ? (
        <div
          className="absolute left-0 z-50 p-4 mt-5 space-y-2 duration-200 bg-white top-full w-fit rounded-2xl dark:bg-slate-800 dark:border dark:border-slate-900 animate-in fade-in zoom-in shadow-sm"
          onMouseDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
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
            locale={locale}
          />
        </div>
      ) : null}
    </div>
  );
}
