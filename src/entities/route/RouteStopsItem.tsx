import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { cn } from '@/shared/lib/utils';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';

type Props = {
  isFirst?: boolean;
  isLast?: boolean;
  bus_changes?: boolean;
  classNameItemContainer?: string;
  route: {
    departure_date_time: string | null | undefined;
    arrival_date_time: string | null | undefined;
    location_name: string | null | undefined;
    station_name: string | null | undefined;
    station_address: string | null | undefined;
  };
};

export default function RouteStopsItem({ isFirst, isLast, bus_changes, route, classNameItemContainer }: Props) {
  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);
  const { departure_date_time, arrival_date_time, location_name, station_name, station_address } = route;
  const departureTime = format(departure_date_time || new Date(), 'HH:mm');
  const arrivalTime = format(arrival_date_time || new Date(), 'HH:mm');

  return (
    <div
      className={`relative flex items-start justify-start ${isLast && cn('overflow-hidden z-10 bg-slate-50 tablet:bg-white dark:bg-slate-900', classNameItemContainer)}`}
    >
      <div
        className={`${isFirst || isLast ? 'text-sm font-bold tracking-normal leading-[16.8px]' : 'text-xs font-bold tracking-normal leading-[18px]'} text-slate-700 dark:text-slate-50 mr-9 min-w-[40px] max-w-[40px]`}
      >
        {isFirst ? departureTime : arrivalTime}
      </div>

      <div
        className={`relative after:content-[''] before:absolute after:rounded-full before:border-[2px] before:w-4 before:h-4 before:top-0 before:-left-[19px] before:-translate-x-1/2 before:rounded-full before:z-20 ${isLast ? 'before:border-green-300' : 'before:border-slate-600 before:bg-slate-50 dark:before:bg-slate-900'} `}
      >
        {isLast && (
          <span className="absolute w-[8px] h-[8px] rounded-full bg-green-300 top-[4px] -left-[19px] -translate-x-1/2" />
        )}
        <div
          className={`${isFirst || isLast ? 'text-sm font-bold tracking-normal leading-[16.8px]' : 'text-xs font-bold tracking-normal leading-[18px]'}  text-slate-700 dark:text-slate-50`}
        >
          {location_name}
        </div>

        <div className="text-slate-400 dark:text-slate-200  text-[10px] mobile:text-xs mobile:font-normal mobile:tracking-normal mobile:leading-[18px]">
          {station_name && `${station_name}, `}
          {station_address}
        </div>
        {!isLast && !isFirst && bus_changes && (
          <div className="p-1 my-0.5  text-white bg-red-500 text-xs  font-bold  rounded-lg text-center">
            {t('organized_transfer')}
          </div>
        )}
      </div>
    </div>
  );
}
