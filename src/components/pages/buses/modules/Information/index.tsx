'use client'

import { CustomCard } from '@/components/shared/CustomCard'
import { format, toDate } from 'date-fns'
import { useShallow } from 'zustand/react/shallow'
import { MobileFilter } from '../../components/MobileFilter'
import { Skeleton } from '@/components/ui/skeleton'
import useDateLocale from '@/hooks/useDateLocale'
import { useSearchStore } from '@/store/useSearch'
import { useLocale, useTranslations } from 'next-intl'
import { extractLocationDetails } from '@/lib/extractLocationDetails'
import useSearchTickets from '../../hooks/useSearchTickets'
import { ArrowRight } from 'lucide-react'
import { useFilterTicketsStore } from '@/store/useFilterTickets'

export const Information = () => {
  const date = useSearchStore(useShallow((state) => state.date))
  const from = useSearchStore(useShallow((state) => state.from))
  const to = useSearchStore(useShallow((state) => state.to))
  const isHydrated = useSearchStore(useShallow((state) => state.isHydrated))
  const filteredTickets = useFilterTicketsStore((state) => state.filteredTickets)

  const { isFetching } = useSearchTickets()
  const t = useTranslations('search')
  const currentLanguage = useLocale()
  const { locale } = useDateLocale()

  return (
    <CustomCard className='p-5 space-y-4 shadow'>
      <div className='flex items-center justify-between'>
        {isHydrated ? (
          <h3 className='h3 laptop:h1 text-text_prymery first-letter:uppercase'>
            {format(toDate(date), 'eee ,d MMM', { locale })}
          </h3>
        ) : (
          <Skeleton className='h-[28px] min-w-20' />
        )}

        <div>
          <MobileFilter />
        </div>
      </div>
      <div className='flex items-center justify-between gap-1'>
        <div className='flex items-center gap-2 main_text_body text-text_secondary text-[12px] leading-4 tetx-black_2_for_text tablet:text-sm  dark:text-gray_1 text-nowrap truncate'>
          {from ? (
            <div>
              {from && extractLocationDetails(from, currentLanguage).locationName},{' '}
              {from && extractLocationDetails(from, currentLanguage).countryName}
            </div>
          ) : (
            <Skeleton className='h-3 bg-light_primary dark:bg-black_2_for_text min-w-20' />
          )}
          <div className='w-3 h-3 grow'>
            <ArrowRight size={12} className='stroke-black_2_for_text dark:stroke-gray_1' />
          </div>
          {to ? (
            <div className='flex items-center'>
              {to && extractLocationDetails(to, currentLanguage).locationName},{' '}
              {to && extractLocationDetails(to, currentLanguage).countryName}
            </div>
          ) : (
            <Skeleton className='h-3 bg-light_primary dark:bg-black_2_for_text min-w-20' />
          )}
        </div>
        <div className='text-[12px]  tablet:text-sm leading-6  text-primary_1 text-nowrap truncate'>
          {`${isFetching ? 0 : filteredTickets?.length} ${t('resul_count')}`}
        </div>
      </div>
    </CustomCard>
  )
}
