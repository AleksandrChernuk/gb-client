import { useCurrentRouteStore } from '@/store/useCurrentRoute';
import DetailsStopsItem from './DetailsStopsItem';
import { getStopsProcessor } from '../../../helpers';

export default function DetailsStopsList() {
  const currentRoute = useCurrentRouteStore((state) => state.сurrentRoute);
  const stops = currentRoute?.details?.stops;

  if (!stops) return null;
  const processStops = getStopsProcessor(currentRoute);

  const processedStops = processStops(stops);

  return processedStops.map((element, idx, array) => (
    <DetailsStopsItem
      point={element}
      key={`${element.station.name}_${idx}`}
      isFirst={idx === 0}
      isLast={idx === array.length - 1}
    />
  ));
}
