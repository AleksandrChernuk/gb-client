'use client'

import { IRouteResponse } from '@/types/route.types'
import { extractLocationDetails } from '@/lib/extractLocationDetails'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'
import { IconRouteLeft } from '../../images/IconRouteLeft'
import { IconRouteRigth } from '../../images/IconRouteRigth'

type TLocation = {
  location: string
  address: string
  date_time: string
}

type TDivider = {
  duration: string
}

type TTicketRouteDesctop = {
  route: IRouteResponse
  locale: string
}

const Location = ({ location, address, date_time }: TLocation) => {
  return (
    <div className='flex flex-col gap-1'>
      <div className='h3 laptop:h1 text-text_prymery'>{date_time}</div>
      <div className='h5 laptop:h4 text-text_prymery'>{location}</div>
      <div className='addional_regular_text text-text_secondary text-wrap'>{address}</div>
    </div>
  )
}

const Divider = ({ duration }: TDivider) => {
  return (
    <div className='flex items-center gap-1 justify-center'>
      <div className='w-[50px] h-[17px]'>
        <IconRouteLeft />
      </div>
      <div className='small_text text-black.2.for.text dark:text-gray_1'>{duration}</div>
      <div className='w-[50px] h-[17px]'>
        <IconRouteRigth />
      </div>
    </div>
  )
}

export default function TicketRouteDesctop({ route, locale }: TTicketRouteDesctop) {
  const t = useTranslations('buses')
  const duration = route.duration?.split(':')

  return (
    <div className='hidden tablet:grid w-full grid-cols-3 gap-2 justify-between'>
      <Location
        date_time={format(route.departure.date_time || new Date(), 'HH:mm')}
        location={extractLocationDetails(route.departure.fromLocation, locale).locationName || ''}
        address={route.departure.station_address || ''}
      />

      <Divider
        duration={
          (duration && `${duration[0]}${t('shortHours')}:${duration[1]}${t('shortMinutes')}`) || ''
        }
      />

      <Location
        date_time={format(route.arrival.date_time || new Date(), 'HH:mm')}
        location={extractLocationDetails(route.arrival.toLocation, locale).locationName || ''}
        address={route.arrival.station_address || ''}
      />
    </div>
  )
}
