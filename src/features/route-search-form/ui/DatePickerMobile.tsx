import { IconCalendar } from '@/assets/icons/IconCalendar';
import { format, toDate } from 'date-fns';
import { useTranslations } from 'next-intl';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
import { Button } from '@/shared/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MainSearchInput } from './MainSearchInput';

import { Calendar } from '@/shared/ui/calendar';
import useDateLocale from '@/shared/hooks/useDateLocale';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

type Props = {
  open: boolean;
  handleToggleOpen: () => void;
  handleSelectDate: (data: Date) => void;
  handleBlur: (event: React.FocusEvent<HTMLDivElement>) => void;
  currentDate: string;
  month: Date;
  setMonth: (newMonth: Date) => void;
  incrementMonth: () => void;
  decrementMonth: () => void;
};

export default function DatePickerMobile({
  open,
  handleToggleOpen,
  handleSelectDate,
  currentDate,
  month,
  setMonth,
  incrementMonth,
  decrementMonth,
}: Props) {
  const t = useTranslations(MESSAGE_FILES.COMMON);
  const { locale } = useDateLocale();

  return (
    <Sheet open={open} onOpenChange={handleToggleOpen}>
      <SheetTrigger asChild>
        <MainSearchInput
          name="date"
          startIcon={<IconCalendar />}
          type="button"
          value={format(currentDate || new Date(), 'dd MMMM', { locale })}
        />
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
        <div className="relative px-5 overflow-y-scroll grow bg-slate-50 dark:bg-slate-900">
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
            hideNavigation
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
            classNames={{ months: 'flex flex-col gap-4' }}
            numberOfMonths={3}
            locale={locale}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
