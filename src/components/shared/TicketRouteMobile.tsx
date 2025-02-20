'use client'

import { extractLocationDetails } from '@/lib/extractLocationDetails'
import { cn } from '@/lib/utils'
import { IRouteResponse } from '@/types/route.types'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'

type TLocation = {
  className?: string
  location: string
  address: string
}

type TTicketRouteMobile = {
  route: IRouteResponse | null
  locale: string
}

type TDateDuration = {
  departure:  string
  duration: string
  arrival: string
}



const DateDuration = ({ departure, duration, arrival }: TDateDuration) => {
  return (
    <div className='flex flex-col justify-between'>
      <div className='button_mobile'>{departure}</div>

      <div className='small_text'>{duration}</div>

      <div className='button_mobile'>{arrival}</div>
    </div>
  )
}

const Location = ({ location, address, className }: TLocation) => {
  return (
    <div className={cn(`pl-8 space-y-0.5 relative`, className)}>
      <div className='flex items-center text-black_2_for_text dark:text-grayy button_mobile tablet:h5'>
        {location}
      </div>
      <div className='small_text text-black_2_for_text dark:text-gray_1 tablet:addional_regular_text'>
        {address}
      </div>
    </div>
  )
}

export default function TicketRouteMobile({ route, locale }: TTicketRouteMobile) {

const t = useTranslations("buses")

if (!route) {
    return null
}
  
const duration = route.duration?.split(':')

return (
     <div className='flex tablet:hidden'>
       

       <DateDuration
         arrival={format(new Date(route?.arrival?.date_time || new Date()), 'HH:mm')}
         departure={format(new Date(route?.departure?.date_time || new Date()), 'HH:mm')}
         duration={
           (duration && `${duration[0]}${t('shortHours')}:${duration[1]}${t('shortMinutes')}`) || ''
         }
       />

       <div className='flex flex-col justify-between gap-4'>
         <Location
           className='poit_from poit_divider'
           location={
             (route?.departure?.fromLocation &&
               extractLocationDetails(route?.departure?.fromLocation, locale).locationName) ||
             ''
           }
           address={route?.departure.station_address || ''}
         />

         <Location
           className='poit_to_wrapp poit_to'
           location={
             (route?.arrival?.toLocation &&
               extractLocationDetails(route?.arrival?.toLocation, locale).locationName) ||
             ''
           }
           address={route?.arrival.station_address || ''}
         />
       </div>
     </div>
   )
}
