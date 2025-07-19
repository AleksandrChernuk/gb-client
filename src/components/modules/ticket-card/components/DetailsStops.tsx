'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import DetailsStopsItem from './DetailsStopsItem';
import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { Button } from '@/components/ui/button';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { useTicketsDetails } from '@/store/useTicketsDetails';

type Props = {
  id: string;
};

export default function DetailsStops({ id }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);
  const currentLocale = useLocale();

  const ticketDetails = useTicketsDetails((state) => state.ticketDetailsMap[id]);
  const stops = ticketDetails?.details?.stops || [];

  return (
    <div className="space-y-2">
      {!open && (
        <div className={`relative flex flex-col items-start gap-2 overflow-visible`}>
          <span className="absolute z-0 left-0 top-0 h-full w-[2px] border-r-[2px] border-[#6f8b90] dark:border-slate-600 border-dashed translate-x-[56.5px]"></span>
          <DetailsStopsItem
            route={{
              station_address: ticketDetails?.departure.stationAddress,
              station_name: ticketDetails?.departure.stationName,
              location_name:
                ticketDetails &&
                extractLocationDetails(ticketDetails?.departure?.fromLocation, currentLocale).locationName,
              departure_date_time: ticketDetails?.departure.dateTime,
              arrival_date_time: ticketDetails?.arrival.dateTime,
            }}
            isFirst
          />

          <DetailsStopsItem
            route={{
              station_address: ticketDetails?.arrival.stationAddress,
              station_name: ticketDetails?.arrival.stationName,
              location_name:
                ticketDetails && extractLocationDetails(ticketDetails?.arrival?.toLocation, currentLocale).locationName,
              departure_date_time: ticketDetails?.arrival.dateTime,
              arrival_date_time: ticketDetails?.arrival.dateTime,
            }}
            isLast
          />
        </div>
      )}

      <div
        className={`transition-all duration-300 ease-[cubic-bezier(0.04,0.62,0.23,0.98)] overflow-hidden space-y-2 ${
          open ? 'max-h-fit opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {open && (
          <div>
            <div className={`relative flex flex-col items-start gap-2 mt-4`}>
              <span className="absolute z-0 left-0 top-0 h-full w-[2px] border-r-[2px] border-[#6f8b90] dark:border-slate-600 border-dashed translate-x-[56.5px]"></span>
              {stops?.map((element, idx, array) => (
                <DetailsStopsItem
                  route={{
                    station_address: element.station.address,
                    station_name: element.station.name,
                    location_name: element.location.name,
                    departure_date_time: element.departureDateTime,
                    arrival_date_time: element.arrivalDateTime,
                  }}
                  bus_changes={!!element.busChanges}
                  key={idx}
                  isFirst={idx === 0}
                  isLast={idx === array.length - 1}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {stops && stops.length > 2 && (
        <Button
          onClick={() => setOpen((p) => !p)}
          variant={'link'}
          className="flex items-center self-end gap-px p-2 text-green-300 underline cursor-pointer text-[12px] font-bold tracking-normal leading-[18px] text-nowrap"
        >{`${open ? t('collapse_route') : t('show_route')}`}</Button>
      )}
    </div>
  );
}
