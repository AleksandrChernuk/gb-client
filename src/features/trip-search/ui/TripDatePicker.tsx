// features/trip-search/ui/TripDatePicker.tsx
'use client';

import { useState, useCallback, useRef } from 'react';
import { startOfMonth, addMonths, subMonths, format, isBefore, toDate } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouterSearch } from '@/shared/hooks/useRouterSearch';
import { Calendar } from '@/shared/ui/calendar';
import { Button } from '@/shared/ui/button';
import { IconCalendar } from '@/assets/icons/IconCalendar';
import useDateLocale from '@/shared/hooks/useDateLocale';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
import { TripSearchInput } from './TripSearchInput';

type Props = {
  variant: 'mobile' | 'desktop';
};

export function TripDatePicker({ variant }: Props) {
  const [params, actions] = useRouterSearch();
  const { locale } = useDateLocale();
  const t = useTranslations(MESSAGE_FILES.COMMON);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const currentDate = params.date ?? format(new Date(), 'yyyy-MM-dd');

  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(() => startOfMonth(currentDate));

  const incrementMonth = () => setMonth((p) => addMonths(p, 1));
  const decrementMonth = () => setMonth((p) => subMonths(p, 1));

  const handleSelect = useCallback(
    (date: Date) => {
      actions.setDate(format(date, 'yyyy-MM-dd'));
      setOpen(false);
    },
    [actions],
  );

  const handleBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
  }, []);

  const displayValue = format(toDate(currentDate), 'dd MMMM', { locale });

  const calendarProps = {
    mode: 'single' as const,
    month,
    selected: toDate(currentDate),
    today: toDate(currentDate),
    disabled: { before: new Date() },
    locale,
    onSelect: (value?: Date) => {
      if (value) {
        setMonth(toDate(value));
        handleSelect(value);
      }
    },
  };

  if (variant === 'mobile') {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <TripSearchInput name="date" startIcon={<IconCalendar />} type="button" value={displayValue} />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="sr-only" />
            <SheetDescription className="sr-only" />
            <SheetClose asChild>
              <Button
                variant="link"
                className="flex items-center gap-1 text-base font-bold text-slate-700 dark:text-slate-50"
              >
                <ChevronLeft size={24} className="stroke-slate-700 dark:stroke-slate-50" />
                {t('backBtn')}
              </Button>
            </SheetClose>
          </SheetHeader>
          <div className="relative px-5 overflow-y-scroll grow bg-slate-50 dark:bg-slate-900">
            <div className="sticky top-0 z-50">
              <div className="flex items-center justify-between w-full py-6 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-base font-bold text-slate-700 dark:text-slate-50 grow">{t('date_picker_title')}</h3>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-8 h-8"
                    onClick={decrementMonth}
                    disabled={isBefore(month, new Date())}
                  >
                    <ChevronLeft className="w-5 h-5 stroke-[#212529] dark:stroke-slate-200" />
                  </Button>
                  <Button size="icon" variant="ghost" className="w-8 h-8" onClick={incrementMonth}>
                    <ChevronRight className="w-5 h-5 stroke-[#212529] dark:stroke-slate-200" />
                  </Button>
                </div>
              </div>
            </div>
            <Calendar
              {...calendarProps}
              hideNavigation
              className="rounded-none"
              classNames={{ months: 'flex flex-col gap-4' }}
              numberOfMonths={3}
              onMonthChange={setMonth}
            />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="relative" onBlur={handleBlur}>
      <TripSearchInput
        ref={inputRef}
        name="date"
        startIcon={<IconCalendar />}
        type="button"
        value={displayValue}
        className={`border-r border-slate-200 dark:border-slate-700 ${open ? 'border-r-transparent dark:border-r-transparent' : ''}`}
        onClick={() => setOpen((p) => !p)}
      />
      {open && (
        <div
          className="absolute left-0 z-50 mt-5 top-full bg-white dark:bg-slate-800 dark:border dark:border-slate-900 rounded-2xl shadow-sm p-4 animate-in fade-in zoom-in"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Calendar
            {...calendarProps}
            onMonthChange={(e) => {
              if (isBefore(addMonths(e, 1), new Date())) return;
              if (isBefore(month, e)) {
                incrementMonth();
              } else {
                decrementMonth();
              }
            }}
            onSelect={(value: Date | undefined) => {
              if (value) {
                setMonth(toDate(value));
                inputRef.current?.blur();
                handleSelect(value);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
