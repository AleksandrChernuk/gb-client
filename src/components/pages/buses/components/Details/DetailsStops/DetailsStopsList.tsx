import { useCurrentRouteStore } from '@/store/useCurrentRoute';
import DetailsStopsItem from './DetailsStopsItem';
import { getStopsProcessor } from '../../../helpers';

export default function DetailsStopsList() {
  const currentRoute = useCurrentRouteStore((state) => state.сurrentRoute);
  const stops = currentRoute?.details?.stops;
console.log(stops);
  if (!stops) return null;
  const processStops = getStopsProcessor(currentRoute);

  const processedStops = processStops(stops);

  return processedStops.map((element, idx, array) => (
    <DetailsStopsItem
      station_address={element.station.address}
      station_name={element.station.name}
      location_name={element.location.name}
      departure_date_time={element.departure_date_time}
      arrival_date_time={element.arrival_date_time}
      key={`${element.station.name}_${idx}`}
      isFirst={idx === 0}
      isLast={idx === array.length - 1}
    />
  ));
}
