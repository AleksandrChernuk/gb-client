'use client';

import { useState } from 'react';
import DetailsStopsList from './DetailsStopsList';
import { useLocale, useTranslations } from 'next-intl';
import DetailsStopsItem from './DetailsStopsItem';
import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { useCurrentTicketStore } from '@/store/useCurrentTicket';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';

export default function DetailsStops() {
  const сurrentTicket = useCurrentTicketStore((state) => state.сurrentTicket);
  const [open, setOpen] = useState<boolean>(false);
  const t = useTranslations('common');
  const currentLocale = useLocale();

  console.log(сurrentTicket?.details?.stops);

  return (
    <div className="space-y-2">
      {!open && (
        <div className={`relative flex flex-col items-start gap-2 overflow-visible`}>
          <span className="absolute z-0 left-0 top-0 h-full w-[2px] border-r-[2px] border-gray_2_for_body dark:border-blackmode border-dashed translate-x-[56.5px]"></span>

          <DetailsStopsItem
            station_address={сurrentTicket?.departure.station_address}
            station_name={сurrentTicket?.departure.station_name}
            location_name={
              сurrentTicket &&
              extractLocationDetails(сurrentTicket?.departure?.fromLocation, currentLocale).locationName
            }
            departure_date_time={сurrentTicket?.departure.date_time}
            arrival_date_time={сurrentTicket?.arrival.date_time}
            isFirst={true}
            isLast={false}
          />

          <DetailsStopsItem
            station_address={сurrentTicket?.arrival.station_address}
            station_name={сurrentTicket?.arrival.station_name}
            location_name={
              сurrentTicket && extractLocationDetails(сurrentTicket?.arrival?.toLocation, currentLocale).locationName
            }
            departure_date_time={сurrentTicket?.arrival.date_time}
            arrival_date_time={сurrentTicket?.arrival.date_time}
            isFirst={false}
            isLast={true}
          />
        </div>
      )}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: open ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
        className="space-y-2 "
      >
        {open && <DetailsStopsList />}
      </motion.div>

      {сurrentTicket?.details?.stops && сurrentTicket.details?.stops?.length > 2 && (
        <Button
          onClick={() => setOpen((p) => !p)}
          variant={'link'}
          className="p-2 cursor-pointer  flex items-center self-end gap-px underline text-primary_1 samll_button text-nowrap"
        >{`${open ? t('collapse_route') : t('show_route')}`}</Button>
      )}
    </div>
  );
}
