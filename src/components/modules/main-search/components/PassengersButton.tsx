'use client'

import { IconDecrement } from '@/components/icons/IconDecrement'
import { IconIncrement } from '@/components/icons/IconIncrement'
import { useSearchStore } from '@/store/useSearch'
import { useTranslations } from 'next-intl'

type Props = {
  type: 'adult' | 'children'
  value: number
}

export const PassengersButton = ({ value, type }: Props) => {
  const t = useTranslations('common')

  const decrementPassenger = useSearchStore((state) => state.decrementPassenger)
  const incrementPassenger = useSearchStore((state) => state.incrementPassenger)

  const isAdult = type === 'adult'
  const maxValue = 10
  const minValue = isAdult ? 1 : 0

  return (
    <div
      className={`flex flex-row items-center justify-between gap-20 ${isAdult && 'border-px border-gray_0'}`}
    >
      <p className='addional_regular_text text-text_prymery text-nowrap'>
        {isAdult ? t('adult') : t('children')}
      </p>

      <div className='bg-white flex gap-2 items-center justify-between p-1 w-24 dark:bg-dark_bg dark:hover:bg-black border-[1px] border-gray_2_for_body dark:border-gray_2_for_body rounded-md transition-all'>
        <button
          className='p-1'
          onClick={() => {
            if (value === minValue) {
              return
            }
            decrementPassenger(type)
          }}
          aria-label={`Decrement ${isAdult ? 'adult' : 'children'}`}
        >
          <IconDecrement disabled={value === minValue} />
        </button>

        <p className='text-center h5 text-search_color grow'>{value}</p>

        <button
          className='p-1'
          onClick={() => {
            if (value === maxValue) {
              return
            }
            incrementPassenger(type)
          }}
          aria-label={`Increment ${isAdult ? 'adult' : 'children'}`}
        >
          <IconIncrement disabled={value === maxValue} />
        </button>
      </div>
    </div>
  )
}
