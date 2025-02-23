'use client';

import { useCurrentRouteStore } from '@/store/useCurrentRoute';
import { useState } from 'react'
import DetailsStopsList from './DetailsStopsList'
import { useLocale, useTranslations } from 'next-intl'
import DetailsStopsItem from './DetailsStopsItem'
import { extractLocationDetails } from '@/lib/extractLocationDetails';
import TicketDetailsButton from '../TicketDetailsButton'

export default function DetailsStops() {
  const [open, setOpen] = useState<boolean>(false);
  const сurrentRoute = useCurrentRouteStore((state) => state.сurrentRoute);
  const t = useTranslations("common");
  const currentLocale = useLocale();

 
  return (
    <div className='space-y-2'>
      {!open && (
        <div className={`relative flex flex-col items-start gap-2 overflow-visible`}>
          <span className='absolute z-0 left-0 top-0 h-full w-[2px] border-r-[2px] border-gray_2_for_body dark:border-blackmode border-dashed translate-x-[56.5px]'></span>

          <DetailsStopsItem
            station_address={сurrentRoute?.departure.station_address}
            station_name={сurrentRoute?.departure.station_name}
            location_name={
              сurrentRoute &&
              extractLocationDetails(сurrentRoute?.departure?.fromLocation, currentLocale)
                .locationName
            }
            departure_date_time={сurrentRoute?.departure.date_time}
            arrival_date_time={сurrentRoute?.arrival.date_time}
            isFirst={true}
            isLast={false}
          />

          <DetailsStopsItem
            station_address={сurrentRoute?.arrival.station_address}
            station_name={сurrentRoute?.arrival.station_name}
            location_name={
              сurrentRoute &&
              extractLocationDetails(сurrentRoute?.arrival?.toLocation, currentLocale).locationName
            }
            departure_date_time={сurrentRoute?.arrival.date_time}
            arrival_date_time={сurrentRoute?.arrival.date_time}
            isFirst={false}
            isLast={true}
          />
        </div>
      )}

      {open && <DetailsStopsList />}

      {сurrentRoute?.details?.stops && сurrentRoute?.details?.stops?.length > 2 && (
        <TicketDetailsButton
          isOpen={open}
          onClick={() => setOpen((p) => !p)}
          text={`${open ? t('collapse_route') : t('show_route')}`}
        />
      )}
    </div>
  )
}
