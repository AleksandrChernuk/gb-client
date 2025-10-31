import TransferStationBadge from '@/features/route-card/base-ui/TransferStationBadge';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { cn } from '@/shared/lib/utils';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';

type Props = {
  isFirst?: boolean;
  isLast?: boolean;
  bus_changes?: boolean;
  classNameItemContainer?: string;
  departure_date_time?: string | null;
  arrival_date_time?: string | null;
  location_name?: string | null;
  station_name?: string | null;
  station_address?: string | null;

  isDepartureChangeStations?: boolean;
  isArrivalChangeStations?: boolean;
  changeStationsType?: 'manual' | 'auto';
  transferTime?: string;
};

export default function RouteStopsItem({
  isFirst = false,
  isLast = false,
  bus_changes = false,
  departure_date_time,
  arrival_date_time,
  location_name,
  station_name,
  station_address,
  classNameItemContainer = '',

  isDepartureChangeStations,
  isArrivalChangeStations,
  changeStationsType,
  transferTime,
}: Props) {
  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);

  const departureTime = departure_date_time ? format(new Date(departure_date_time), 'HH:mm') : '--:--';
  const arrivalTime = arrival_date_time ? format(new Date(arrival_date_time), 'HH:mm') : '--:--';
  const displayTime = isFirst ? departureTime : arrivalTime;

  const showBusChange = !isLast && !isFirst && bus_changes;

  return (
    <div
      className={cn(
        'relative flex items-start justify-start',
        isLast && 'overflow-hidden z-10 bg-slate-50 tablet:bg-white dark:bg-slate-900',
        isLast && classNameItemContainer,
      )}
    >
      {/* Time section */}
      <div
        className={cn(
          'mr-9 min-w-[40px] max-w-[40px]',
          isFirst || isLast
            ? 'text-sm font-bold tracking-normal leading-[16.8px] text-slate-700 dark:text-slate-50'
            : 'text-xs font-bold tracking-normal leading-[18px] text-slate-500 dark:text-slate-50',
        )}
      >
        {displayTime}
      </div>

      {/* Location section */}
      <div className="relative">
        {/* Dot indicator */}
        <div
          className={cn(
            'absolute w-4 h-4 top-0 -left-[19px] -translate-x-1/2 rounded-full border-[2px] z-20',
            isLast ? 'border-green-300' : 'border-slate-600 bg-slate-50 dark:bg-slate-900',
          )}
        />

        {/* Inner green dot for last stop */}
        {isLast && (
          <span className="absolute w-[8px] h-[8px] rounded-full bg-green-300 top-[4px] -left-[19px] -translate-x-1/2" />
        )}

        {/* Location name */}
        <div
          className={cn(
            'text-slate-700 dark:text-slate-50',
            isFirst || isLast
              ? 'text-[16px] font-bold tracking-normal leading-[16.8px]'
              : 'text-xs font-bold tracking-normal leading-[18px]',
          )}
        >
          {location_name || 'Unknown location'}
        </div>

        {/* Station details */}
        <div className="text-slate-400 dark:text-slate-200 text-[10px] mobile:text-xs mobile:font-normal mobile:tracking-normal mobile:leading-[18px]">
          {station_name && `${station_name}, `}
          {station_address || 'Address not specified'}
        </div>

        {/* Bus change badge */}
        {showBusChange && (
          <div className="p-1 my-0.5 text-white bg-red-500 text-xs font-bold rounded-lg text-center">
            {t('organized_transfer')}
          </div>
        )}

        <div className="mt-2">
          <TransferStationBadge
            isDepartureChangeStations={isDepartureChangeStations}
            isArrivalChangeStations={isArrivalChangeStations}
            changeStationsType={changeStationsType}
            transferTime={transferTime}
          />
        </div>
      </div>
    </div>
  );
}
