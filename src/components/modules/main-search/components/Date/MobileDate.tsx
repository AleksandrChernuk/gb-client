"use client";

import { format, toDate } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IconCalendar } from '@/components/icons/IconCalendar';
import { useDate } from '../../hooks/useDate';
import { useShallow } from 'zustand/react/shallow';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { InputError, StartIcon } from '../../ui';
import { CustomDarwer } from '@/components/shared/CustomDarwer';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { memo } from 'react';
import { useSearchStore } from '@/store/useSearch';
import useDateLocale from '@/hooks/useDateLocale';
import { useTranslation } from 'react-i18next';
import { DrawerClose } from '@/components/ui/drawer';
import { IconBack } from '@/components/icons/IconBack';

export const MobileDate = memo(() => {
  const { open, handleToggleOpen, handleSelectDate } = useDate();
  const { t } = useTranslation(['common']);
  const { locale } = useDateLocale();

  const currentDate = useSearchStore(useShallow((state) => state.date));
  const month = useSearchStore((state) => state.month);
  const incrementMonth = useSearchStore((state) => state.incrementMonth);
  const decrementMonth = useSearchStore((state) => state.decrementMonth);
  const setMonth = useSearchStore((state) => state.setMonth);

  return (
    <CustomDarwer
      open={open}
      toggleOpen={handleToggleOpen}
      trigger={
        <div className='relative'>
          <StartIcon icon={<IconCalendar />} />
          <input
            type='button'
            value={format(currentDate || new Date(), 'dd MMMM', { locale })}
            className='z-0 min-h-10 rounded-md size-full h-auto px-4 py-2 pl-8 tablet:px-9 laptop:px-12 tablet:py-4 outline-hidden bg-transparent focus:bg-gray_1 active:bg-gray_1 dark:focus:bg-black_2_for_text dark:active:bg-black_2_for_text placeholder-black dark:placeholder-gray_0 body_medium laptop:filter_input_medium_text text-black dark:text-grayy text-left text-nowrap truncate border-[1px] border-transparent'
            onFocus={() => {
              handleToggleOpen();
            }}
          />
          <InputError inputError={null} />
        </div>
      }
    >
      <div className='flex items-center justify-between border-b-[2px] px-5 py-6  border-b-gray_1 dark:border-b-black_2_for_text dark:bg-dark_mode_main1'>
        <DrawerClose className='flex items-center gap-1 h5 text-text_prymery_color'>
          <IconBack />
          {t('backBtn')}
        </DrawerClose>
      </div>
      <ScrollArea className='relative pb-5 overflow-y-scroll grow bg-grayy dark:bg-background_black_mode'>
        <div className='sticky top-0 left-0 right-0 z-50 px-5'>
          <div className='flex items-center justify-between w-full py-6 bg-grayy dark:bg-background_black_mode'>
            <h3 className='grow h4 text-text_prymery_color'>{t('date_picker_title')}</h3>
            <div className='flex items-center justify-end gap-2'>
              <Button
                className='w-8 h-8'
                size={'icon'}
                variant={'ghost'}
                onClick={decrementMonth}
                disabled={month < new Date()}
              >
                <ChevronLeft className={'h-5 w-5 stroke-gray_5 dark:stroke-gray_1'} />
              </Button>
              <Button className='w-8 h-8' size={'icon'} variant={'ghost'} onClick={incrementMonth}>
                <ChevronRight className={'h-5 w-5 stroke-gray_5 dark:stroke-gray_1'} />
              </Button>
            </div>
          </div>
        </div>
        <div className='px-5 my-5'>
          <Calendar
            mode='single'
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
            className='rounded-none'
            classNames={{
              row: 'flex w-full items-center justify-between mt-2 gap-2',
              head_row: 'flex w-full items-center justify-between gap-1 mobile:gap-2',
              months: 'flex flex-col gap-4',
              nav_button_previous: 'hidden',
              nav_button_next: 'hidden',
              cell: 'h-9 w-9 rounded-full text-center text-base p-0 relative flex justify-center items-center [&:has([aria-selected])]:bg-transporante &:has([aria-selected])]:dark:text-gray_1 dark:text-gray_1  hover:bg-primary_1 hover:text-white   focus-within:relative focus-within:z-20',

              day: 'rounded-full h-9 w-9 p-0 text-sm font-medium tracking-normal leading-[21.6px]	aria-selected:opacity-100 hover:bg-primary_1 hover:text-white ',

              caption:
                'flex justify-start relative items-center mb-4 text-sm text-black_2_for_text dark:text-grayy font-medium',
            }}
            numberOfMonths={3}
            locale={locale}
          />
        </div>
      </ScrollArea>
    </CustomDarwer>
  );
});

MobileDate.displayName = "MobileDate";
