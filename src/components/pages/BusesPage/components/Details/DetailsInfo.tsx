'use client'

import { extractLocationDetails } from '@/lib/extractLocationDetails'
import { useCurrentTicketStore } from '@/store/useCurrentTicket'
import { format } from 'date-fns'
import { ChevronRight, Clock3, Route } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

export default function DetailsInfo() {
  const currentLocale = useLocale()
  const t = useTranslations('search')
  const сurrentTicket = useCurrentTicketStore((state) => state.сurrentTicket)

  const durationArr = сurrentTicket?.duration?.split(':') ?? ''

  return (
    <div className='space-y-1'>
      <div className='gap-2 flex_center'>
        <h5 className='h6 text-text_prymery'>{t('route')}:</h5>

        <div className='flex_center gap-2 text-primary_1 text-text-text_secondary text-[10px] mobile:small_text'>
          {` ${format(сurrentTicket?.departure.date_time || new Date(), 'EEE dd')}, 
                  ${сurrentTicket && extractLocationDetails(сurrentTicket?.departure.fromLocation, currentLocale).locationName}`}
          <ChevronRight size={16} className='stroke-primary_1' />
          {` ${format(сurrentTicket?.arrival.date_time || new Date(), 'EEE dd')}, 
                 ${
                   сurrentTicket &&
                   extractLocationDetails(сurrentTicket?.arrival.toLocation, currentLocale)
                     .locationName
                 }`}
        </div>
      </div>

      <div className='gap-2 flex_center text-text_secondary text-[10px] mobile:small_text'>
        <Route className='rotate-90 stroke-gray_2_for_body dark:stroke-gray_1' size={16} />
        <span>{t('travel_time')}:</span>
        {/* <span>{`${durationArr[0]}${t('shortHours')},${durationArr[1]}${t('shortMinutes')}`}</span> */}
      </div>

      <div className='gap-2 flex_center '>
        <Clock3 className='stroke-gray_2_for_body dark:stroke-gray_1' size={16} />
        <p className='text-wrap text-text_secondary  text-[10px] mobile:small_text'>
          {t('local_time')}
        </p>
      </div>
    </div>
  )
}
