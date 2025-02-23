import { useCurrentRouteStore } from '@/store/useCurrentRoute';
import DetailsStopsItem from './DetailsStopsItem'
 
export default function DetailsStopsList() {
  const currentRoute = useCurrentRouteStore((state) => state.сurrentRoute)
  const stops = currentRoute?.details?.stops
  if (!stops) return null

  return (
    <div className={`relative flex flex-col items-start gap-2 mt-4`}>
      <span className='absolute z-0 left-0 top-0 h-full w-[2px] border-r-[2px] border-gray_2_for_body dark:border-blackmode border-dashed translate-x-[56.5px]'>
        {stops.map((element, idx, array) => (
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
        ))}
      </span>
    </div>
  )
}
