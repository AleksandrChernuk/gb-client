'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { format, toDate } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { IconCalendar } from '@/components/icons/IconCalendar'
import { useDate } from '../../hooks/useDate'
import { useShallow } from 'zustand/react/shallow'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { useSearchStore } from '@/store/useSearch'
import useDateLocale from '@/hooks/useDateLocale'
import { IconBack } from '@/components/icons/IconBack'
import { useTranslations } from 'next-intl'
import { calendarStyles } from './style'
import { StartIcon } from '../../components/StartIcon'
import { InputError } from '../../components/InputError'

export const MobileDate = () => {
  const { open, handleToggleOpen, handleSelectDate } = useDate()
  const { locale } = useDateLocale()
  const currentDate = useSearchStore(useShallow((state) => state.date))
  const month = useSearchStore((state) => state.month)
  const incrementMonth = useSearchStore((state) => state.incrementMonth)
  const decrementMonth = useSearchStore((state) => state.decrementMonth)
  const setMonth = useSearchStore((state) => state.setMonth)
  const t = useTranslations('common')

  return (
    <Sheet open={open} onOpenChange={handleToggleOpen}>
      <SheetTrigger asChild>
        <div className='relative'>
          <StartIcon icon={<IconCalendar />} />
          <input
            type='button'
            value={format(currentDate || new Date(), 'dd MMMM', { locale })}
            className='z-0 min-h-10 rounded-md size-full h-auto px-4 py-2 pl-8 tablet:px-9 laptop:px-12 tablet:py-4 outline-hidden bg-transparent focus:bg-gray_1 active:bg-gray_1 dark:focus:bg-black_2_for_text dark:active:bg-black_2_for_text placeholder-black dark:placeholder-gray_0 body_medium laptop:filter_input_medium_text text-black dark:text-grayy text-left text-nowrap truncate border-[1px] border-transparent'
            onFocus={() => {
              handleToggleOpen()
            }}
          />
          <InputError inputError={null} />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className='sr-only'>Edit profile</SheetTitle>
          <SheetDescription className='sr-only'>
            Make changes to your profile here. Click save when youre done.
          </SheetDescription>

          <SheetClose asChild>
            <Button variant={'link'} className='flex items-center gap-1 h5 text-text_prymery'>
              <IconBack />
              {t('backBtn')}
            </Button>
          </SheetClose>
        </SheetHeader>
        <ScrollArea className='relative px-5 overflow-y-scroll grow bg-grayy dark:bg-dark_bg'>
          <div className='sticky top-0 left-0 right-0 z-50'>
            <div className='flex items-center justify-between w-full py-6 bg-grayy dark:bg-dark_bg'>
              <h3 className='grow h5 text-text_prymery'>{t('date_picker_title')}</h3>
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
                <Button
                  className='w-8 h-8'
                  size={'icon'}
                  variant={'ghost'}
                  onClick={incrementMonth}
                >
                  <ChevronRight className={'h-5 w-5 stroke-gray_5 dark:stroke-gray_1'} />
                </Button>
              </div>
            </div>
          </div>
          <Calendar
            mode='single'
            month={month}
            disableNavigation
            selected={currentDate ? toDate(currentDate) : toDate(new Date())}
            today={currentDate ? toDate(currentDate) : toDate(new Date())}
            onSelect={(value) => {
              if (value) {
                setMonth(toDate(value))
              }
              handleSelectDate(value || new Date())
            }}
            disabled={{ before: new Date() }}
            className='rounded-none'
            classNames={calendarStyles.mobile}
            numberOfMonths={3}
            locale={locale}
          />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
