

import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { IRouteResponse } from '@/types/route.types';
  import { cn } from "@/lib/utils";
import DetailsStopsItem from './Details/DetailsStops/DetailsStopsItem';

type Props = {
  route: IRouteResponse|null;
  locale: string;
  className?:string
};

export default function RouteTicketMobile({ route, locale, className }: Props) {
  if (!route) {
  return null
}

  return (
    <div className={cn(`relative flex flex-col items-start gap-2 overflow-visible  `,className)}>
      <span className="absolute z-0 left-0 top-0 h-full w-[2px] border-r-[2px] border-gray_2_for_body dark:border-blackmode border-dashed translate-x-[56.5px]"></span>

      <DetailsStopsItem
        station_address={route?.departure.station_address}
        station_name={route?.departure.station_name}
        location_name={extractLocationDetails(route?.departure.fromLocation, locale).locationName}
        departure_date_time={route?.departure.date_time}
        arrival_date_time={route?.arrival.date_time}
        isFirst={true}
        isLast={false}
      />
      <DetailsStopsItem
        station_address={route?.arrival.station_address}
        station_name={route?.arrival.station_name}
        location_name={extractLocationDetails(route?.arrival.toLocation, locale).locationName}
        departure_date_time={route?.arrival.date_time}
        arrival_date_time={route?.arrival.date_time}
        isFirst={false}
        isLast={true}
      />
    </div>
  );
}
