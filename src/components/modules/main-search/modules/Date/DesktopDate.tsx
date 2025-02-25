'use client'

import { IconCalendar } from '@/components/icons/IconCalendar'
import { addMonths, format, isBefore, toDate } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { useDate } from '../../hooks/useDate'
import { AnimatePresence } from 'motion/react'
import { motion } from 'motion/react'
import { useShallow } from 'zustand/react/shallow'
import { useSearchStore } from '@/store/useSearch'
import useDateLocale from '@/hooks/useDateLocale'
import { calendarStyles } from './style'
import { StartIcon } from '../../components/StartIcon'
import { InputError } from '../../components/InputError'

export const DesktopDate = () => {
  const { open, handleToggleOpen, handleSelectDate, handleBlur, inputRef } = useDate()
  const { locale } = useDateLocale()

  const currentDate = useSearchStore(useShallow((state) => state.date))
  const month = useSearchStore((state) => state.month)
  const incrementMonth = useSearchStore((state) => state.incrementMonth)
  const decrementMonth = useSearchStore((state) => state.decrementMonth)
  const setMonth = useSearchStore((state) => state.setMonth)

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
            handleToggleOpen()
          }}
        />
        <InputError inputError={null} />
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className='absolute left-0 top-full mt-5 w-fit p-4 rounded-2xl bg-white dark:bg-dark_main shadow space-y-2 z-50'
            key='box'
            onMouseDown={(event) => {
              event.preventDefault()
              event.stopPropagation()
            }}
          >
            <Calendar
              mode='single'
              month={month}
              onMonthChange={(e) => {
                if (isBefore(addMonths(e, 1), new Date())) return
                if (isBefore(month, e)) {
                  return incrementMonth()
                }
                decrementMonth()
              }}
              selected={toDate(currentDate) || new Date()}
              today={toDate(currentDate) || new Date()}
              onSelect={(value) => {
                if (value) {
                  setMonth(toDate(value))
                }
                inputRef.current?.blur()
                handleSelectDate(value || new Date())
              }}
              disabled={{ before: new Date() }}
              className='rounded-none'
              classNames={calendarStyles.desctop}
              locale={locale}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
