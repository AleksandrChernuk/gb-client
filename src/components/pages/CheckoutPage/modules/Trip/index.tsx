'use client'

import { format, toDate } from 'date-fns'
import { extractLocationDetails } from '@/lib/extractLocationDetails'
import { useLocale } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import useDateLocale from '@/hooks/useDateLocale'
import { useCurrentTicketStore } from '@/store/useCurrentTicket'

export default function Trip() {
  const сurrentTicket = useCurrentTicketStore((state) => state.сurrentTicket)
  const locale = useLocale()
  const { locale: ld } = useDateLocale()

  if (!сurrentTicket) {
    return null
  }

  return (
    <div className='space-y-2'>
      <div className='addional_regular_text text-primary flex items-center gap-1 laptop:hidden'>
        <span>
          {format(toDate(сurrentTicket?.departure?.date_time || new Date()), 'eee ,d MMM', {
            locale: ld,
          })}
        </span>
        <ArrowRight size={12} className='stroke-primary' />
        <span>
          {format(toDate(сurrentTicket?.arrival?.date_time || new Date()), 'eee ,d MMM', {
            locale: ld,
          })}
        </span>
      </div>

      <div className='flex flex-row items-start gap-2'>
        <div className={`relative space-y-2 laptop:space-y-4`}>
          <div className='flex items-center'>
            <div className='hidden laptop:block text-black_2_for_text dark:text-grayy button_mobile tablet:h5'>
              {format(new Date(сurrentTicket?.departure?.date_time || new Date()), 'HH:mm')}
              <span className='block text-nowrap small_text'>
                {format(toDate(сurrentTicket?.departure?.date_time || new Date()), 'd MMM', {
                  locale: ld,
                })}
              </span>
            </div>

            <div className={`pl-10 space-y-0.5 relative poit_from poit_divider`}>
              <p className='flex items-center text-black_2_for_text dark:text-grayy button_mobile tablet:h5'>
                {
                  extractLocationDetails(сurrentTicket?.departure?.fromLocation, locale)
                    .locationName
                }
                <span className='block laptop:hidden'>
                  , {format(new Date(сurrentTicket?.departure?.date_time || new Date()), 'HH:mm')}
                </span>
              </p>
              <p className='small_text text-black_2_for_text dark:text-gray_1 tablet:addional_regular_text'>
                {сurrentTicket?.departure.station_address}
              </p>
            </div>
          </div>

          <div className='flex items-center'>
            <div className='hidden laptop:block text-black_2_for_text dark:text-grayy button_mobile tablet:h5  '>
              {format(new Date(сurrentTicket?.arrival?.date_time || new Date()), 'HH:mm')}
              <span className='block text-nowrap small_text'>
                {format(toDate(сurrentTicket?.arrival?.date_time || new Date()), 'd MMM', {
                  locale: ld,
                })}
              </span>
            </div>

            <div className={`pl-10 space-y-0.5 relative poit_to_wrapp poit_to`}>
              <p className='flex items-center text-black_2_for_text dark:text-white button_mobile tablet:h5'>
                {extractLocationDetails(сurrentTicket?.arrival?.toLocation, locale).locationName}
                <span className='block laptop:hidden'>
                  , {format(new Date(сurrentTicket?.arrival?.date_time || new Date()), 'HH:mm')}
                </span>
              </p>
              <p className='small_text text-black_2_for_text dark:text-white tablet:addional_regular_text'>
                {сurrentTicket?.arrival.station_address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
