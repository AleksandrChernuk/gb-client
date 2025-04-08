'use client';

import { IconCalendar } from '@/components/icons/IconCalendar';
import { addMonths, format, isBefore, toDate } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { useShallow } from 'zustand/react/shallow';
import { useSearchStore } from '@/store/useSearch';
import useDateLocale from '@/hooks/useDateLocale';

import { useTranslations } from 'next-intl';
import { calendarStyles } from '../styles/style';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useDate } from '../hooks/useDate';
import { StartIcon } from '../components/StartIcon';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { InputError } from '../components/InputError';

type Props = {
  type: 'mobile' | 'desktop';
};

export default function DatePicker({ type }: Props) {
  const { open, handleToggleOpen, handleSelectDate, inputRef, handleBlur } = useDate();

  const { locale } = useDateLocale();
  const currentDate = useSearchStore(useShallow((state) => state.date));
  const month = useSearchStore((state) => state.month);
  const incrementMonth = useSearchStore((state) => state.incrementMonth);
  const decrementMonth = useSearchStore((state) => state.decrementMonth);
  const setMonth = useSearchStore((state) => state.setMonth);
  const t = useTranslations('common');

  switch (type) {
    case 'mobile':
      return (
        <Sheet open={open} onOpenChange={handleToggleOpen}>
          <SheetTrigger asChild>
            <div className="relative">
              <StartIcon icon={<IconCalendar />} />
              <input
                type="button"
                value={format(currentDate || new Date(), 'dd MMMM', { locale })}
                className="z-0 min-h-10 rounded-md size-full h-auto px-4 py-2 pl-8 tablet:px-9 laptop:px-12 tablet:py-4 outline-hidden bg-transparent focus:bg-slate-200 active:bg-slate-200 dark:focus:bg-slate-700 dark:active:bg-slate-700 placeholder-black dark:placeholder-[#e6e6e6] text-base font-medium tracking-normal leading-[24px] laptop:text-lg laptop:leading-[21.6px] text-black dark:text-slate-50 text-left text-nowrap truncate border-[1px] border-transparent"
                onFocus={() => {
                  handleToggleOpen();
                }}
              />
              <InputError inputError={null} />
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="sr-only">Edit profile</SheetTitle>
              <SheetDescription className="sr-only">
                Make changes to your profile here. Click save when youre done.
              </SheetDescription>

              <SheetClose asChild>
                <Button
                  variant={'link'}
                  className="flex items-center gap-1 text-base font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50"
                >
                  <ChevronLeft size={24} className="stroke-slate-700 dark:stroke-slate-50" />
                  {t('backBtn')}
                </Button>
              </SheetClose>
            </SheetHeader>
            <ScrollArea className="relative px-5 overflow-y-scroll grow bg-slate-50 dark:bg-slate-900">
              <div className="sticky top-0 left-0 right-0 z-50">
                <div className="flex items-center justify-between w-full py-6 bg-slate-50 dark:bg-slate-900">
                  <h3 className="text-base font-bold leading-6 tracking-normal grow text-slate-700 dark:text-slate-50">
                    {t('date_picker_title')}
                  </h3>
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      className="w-8 h-8"
                      size={'icon'}
                      variant={'ghost'}
                      onClick={decrementMonth}
                      disabled={month < new Date()}
                    >
                      <ChevronLeft className={'h-5 w-5 stroke-[#212529] dark:stroke-slate-200'} />
                    </Button>
                    <Button className="w-8 h-8" size={'icon'} variant={'ghost'} onClick={incrementMonth}>
                      <ChevronRight className={'h-5 w-5 stroke-[#212529] dark:stroke-slate-200'} />
                    </Button>
                  </div>
                </div>
              </div>
              <Calendar
                mode="single"
                month={month}
                disableNavigation
                selected={currentDate ? toDate(currentDate) : toDate(new Date())}
                today={currentDate ? toDate(currentDate) : toDate(new Date())}
                onSelect={(value) => {
                  if (value) {
                    setMonth(toDate(value));
                  }
                  handleSelectDate(value || new Date());
                }}
                disabled={{ before: new Date() }}
                className="rounded-none"
                classNames={calendarStyles.mobile}
                numberOfMonths={3}
                locale={locale}
              />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      );

    case 'desktop':
      return (
        <div role="dropdown-warapp" className="relative" onBlur={handleBlur}>
          <div
            className={`relative border-r border-slate-200 dark:border-slate-700 ${
              open && 'dark:border-r-transparent border-r-transparent'
            }`}
          >
            <StartIcon icon={<IconCalendar />} />
            <input
              ref={inputRef}
              type="button"
              value={format(currentDate || new Date(), 'dd MMMM ', { locale })}
              className="z-0 min-h-10 rounded-md size-full h-auto px-4 py-2 pl-8 tablet:px-9 laptop:px-12 tablet:py-4 outline-hidden bg-transparent focus:bg-slate-200 active:bg-slate-200 dark:focus:bg-slate-700 dark:active:bg-slate-700 placeholder-black dark:placeholder-[#e6e6e6] text-base font-medium tracking-normal leading-[24px] laptop:text-lg laptop:tracking-tighter laptop:leading-[21.6px] text-black dark:text-slate-50 text-left text-nowrap truncate border-[1px] border-transparent"
              onClick={() => {
                handleToggleOpen();
              }}
            />
            <InputError inputError={null} />
          </div>

          {open ? (
            <div
              className="absolute left-0 z-50 p-4 mt-5 space-y-2 duration-200 bg-white shadow-xs top-full w-fit rounded-2xl dark:bg-slate-800 dark:border dark:border-slate-900 animate-in fade-in zoom-in"
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
                className="rounded-none"
                classNames={calendarStyles.desktop}
                locale={locale}
              />
            </div>
          ) : null}
        </div>
      );

    default:
      return null;
  }
}
