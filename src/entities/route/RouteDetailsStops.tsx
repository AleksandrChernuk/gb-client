'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import DetailsStopsItem from './RouteStopsItem';
import { Button } from '@/shared/ui/button';
import { IStops } from '@/shared/types/stops.interface';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

type Props = {
  stops?: IStops[] | null;
  to_station_address?: string | null;
  to_station_name?: string | null;
  to_location_name?: string | null;
  to_departure_date_time?: string | null;
  to_arrival_date_time?: string | null;
  from_station_address?: string | null;
  from_station_name?: string | null;
  from_location_name?: string | null;
  from_departure_date_time?: string | null;
  from_arrival_date_time?: string | null;
  classNameItemContainer?: string;
};

export default function RouteDetailsStops({
  to_station_address = '',
  to_station_name = '',
  to_location_name = '',
  to_departure_date_time = '',
  to_arrival_date_time = '',
  from_station_address = '',
  from_station_name = '',
  from_location_name = '',
  from_departure_date_time = '',
  from_arrival_date_time = '',
  classNameItemContainer,

  stops = [],
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);

  return (
    <div className="space-y-2">
      {!open && (
        <div className={`relative flex flex-col items-start gap-2 overflow-visible`}>
          <span className="absolute z-0 left-0 top-0 h-full w-[2px] border-r-[2px] border-[#6f8b90] dark:border-slate-600 border-dashed translate-x-[56.5px]"></span>
          <DetailsStopsItem
            route={{
              station_address: to_station_address,
              station_name: to_station_name,
              location_name: to_location_name,
              departure_date_time: to_departure_date_time,
              arrival_date_time: to_arrival_date_time,
            }}
            isFirst
            classNameItemContainer={classNameItemContainer}
          />

          <DetailsStopsItem
            route={{
              station_address: from_station_address,
              station_name: from_station_name,
              location_name: from_location_name,
              departure_date_time: from_departure_date_time,
              arrival_date_time: from_arrival_date_time,
            }}
            isLast
            classNameItemContainer={classNameItemContainer}
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

              {stops
                ?.filter((el) => el.station?.address || el.location?.name)
                .map((element, idx, array) => {
                  return (
                    <DetailsStopsItem
                      route={{
                        station_name: element.station.name,
                        location_name: element.location.name,
                        station_address: element.station.address,
                        departure_date_time: element.arrivalDateTime ?? element.departureDateTime,
                        arrival_date_time: element.departureDateTime ?? element.arrivalDateTime,
                      }}
                      bus_changes={!!element.busChanges}
                      key={idx}
                      isFirst={idx === 0}
                      isLast={idx === array.length - 1}
                      classNameItemContainer={classNameItemContainer}
                    />
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {stops && stops.length > 2 && (
        <Button
          onClick={() => setOpen((p) => !p)}
          variant={'link'}
          className="flex items-center self-end gap-px p-2 text-green-200 underline cursor-pointer text-[12px] font-bold tracking-normal leading-[18px] text-nowrap"
        >{`${open ? t('collapse_route') : t('show_route')}`}</Button>
      )}
    </div>
  );
}
