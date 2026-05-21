import React, { Dispatch, SetStateAction } from 'react';
import { IconCalendar } from '@/assets/icons/IconCalendar';
import { format, isBefore, addMonths, toDate } from 'date-fns';
import { useTranslations } from 'next-intl';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/drawer';
import { X, CalendarDays } from 'lucide-react';
import { MainSearchInput } from './MainSearchInput';
import { Calendar } from '@/shared/ui/calendar';
import useDateLocale from '@/shared/hooks/useDateLocale';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

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
};

export default function DatePickerMobile({
  open,
  setOpen,
  handleSelectDate,
  currentDate,
  month,
  incrementMonth,
  decrementMonth,
}: Props) {
  const t = useTranslations(MESSAGE_FILES.COMMON);
  const { locale } = useDateLocale();

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <MainSearchInput
          name="date"
          startIcon={<IconCalendar />}
          type="button"
          value={format(currentDate || new Date(), 'dd MMMM', { locale })}
        />
      </DrawerTrigger>
      <DrawerContent className="rounded-t-[32px] p-0 h-auto overflow-hidden border-t shadow-2xl">
        <DrawerTitle className="sr-only"></DrawerTitle>
        <DrawerDescription className="sr-only"></DrawerDescription>

        <div className="flex flex-col bg-background pb-8">
          <DrawerHeader className="p-4 border-b text-left flex flex-row items-center justify-between border-none">
            <div className="text-lg font-black flex items-center gap-2 text-slate-700 dark:text-slate-50">
              <CalendarDays className="w-5 h-5 text-primary" />
              {t('date_picker_title')}
            </div>
          </DrawerHeader>
          <div className="flex items-center justify-center p-4">
            <Calendar
              mode="single"
              locale={locale}
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
                handleSelectDate(value || new Date());
              }}
              disabled={{ before: new Date() }}
              className="w-full flex justify-center scale-100 sm:scale-100"
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
