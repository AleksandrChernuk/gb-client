import { useCurrentTicketStore } from '@/store/useCurrentTicket';
import DetailsStopsItem from './DetailsStopsItem';
import { useTicketDetailsContext } from '../context/TicketDetailsContext';

export default function DetailsStopsList() {
  const { id } = useTicketDetailsContext();

  const ticketDetails = useCurrentTicketStore((state) => state.tickets[id]);
  const stops = ticketDetails?.details?.stops;
  if (!stops) return null;

  return (
    <div>
      <div className={`relative flex flex-col items-start gap-2 mt-4`}>
        <span className="absolute z-0 left-0 top-0 h-full w-[2px] border-r-[2px] border-gray_2_for_body dark:border-blackmode border-dashed translate-x-[56.5px]"></span>
        {stops?.map((element, idx, array) => (
          <DetailsStopsItem
            station_address={element.station.address}
            station_name={element.station.name}
            bus_changes={!!element.bus_changes}
            location_name={element.location.name}
            departure_date_time={element.departure_date_time}
            arrival_date_time={element.arrival_date_time}
            key={idx}
            isFirst={idx === 0}
            isLast={idx === array.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
