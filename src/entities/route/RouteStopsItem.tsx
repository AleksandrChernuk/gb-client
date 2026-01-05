import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { cn } from '@/shared/lib/utils';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';
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

  const isManualTransfer = changeStationsType === 'manual';
  const isAutoTransfer = changeStationsType === 'auto';
  const showBusChange = !isLast && !isFirst && bus_changes;

  return (
    <div
      className={cn(
        'relative flex items-start justify-start',
        isLast && 'overflow-hidden z-10 bg-white dark:bg-slate-900',
        isLast && classNameItemContainer,
      )}
    >
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

      <div className="relative">
        <div
          className={cn(
            'absolute w-4 h-4 top-0 -left-[19px] -translate-x-1/2 rounded-full border-[2px] z-20',
            isLast ? 'border-green-300' : 'border-slate-600 bg-slate-50 dark:bg-slate-900',
          )}
        />

        {isLast && (
          <span className="absolute w-[8px] h-[8px] rounded-full bg-green-300 top-[4px] -left-[19px] -translate-x-1/2" />
        )}

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

        <div className="text-slate-400 dark:text-slate-200 text-[10px] mobile:text-xs mobile:font-normal mobile:tracking-normal mobile:leading-[18px]">
          {station_name && `${station_name}, `}
          {station_address || 'Address not specified'}
        </div>

        {showBusChange && (
          <div className="flex flex-row flex-wrap items-center gap-2 mt-2">
            <div className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold rounded-lg bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
              <span>✓</span>
              <span>{t('organized_transfer')}</span>
            </div>
            {!!transferTime && (
              <div className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <Clock size={14} />
                <span>
                  {t('transfer_time')}: {transferTime}
                </span>
              </div>
            )}
            {isManualTransfer && (
              <div className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold rounded-lg bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                <span>✓</span>
                <span>{t('organized_transfer')}</span>
              </div>
            )}

            {isAutoTransfer && (
              <div className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold rounded-lg bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
                <span>⚠️</span>
                <span>{t('self_transfer')}</span>
              </div>
            )}
            {isArrivalChangeStations && (
              <div className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold rounded-lg bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                <span>🚏</span>
                <span>{t('arrival_transfer_station')}</span>
              </div>
            )}

            {isDepartureChangeStations && (
              <div className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                <span>🚌</span>
                <span>{t('departure_transfer_station')}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
