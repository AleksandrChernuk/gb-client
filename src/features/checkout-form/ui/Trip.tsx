'use client';

import { format } from 'date-fns';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import arrow from '@/assets/icons/arrow-mobile.svg';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import { Skeleton } from '@/shared/ui/skeleton';
import { IRouteResponse } from '@/shared/types/route.types';
import { ILocation } from '@/shared/types/location.types';

type TripProps = {
  route: IRouteResponse | null;
  fromLocation?: ILocation | null;
  toLocation?: ILocation | null;
  isHydrated?: boolean;
};

export default function Trip({ route, fromLocation, toLocation, isHydrated = true }: TripProps) {
  const locale = useLocale();

  if (!route) return null;

  const date_time_from = format(route.departure.dateTime || new Date(), 'HH:mm');
  const location_from = extractLocationDetails(fromLocation || route.departure.fromLocation, locale).locationName || '';
  const address_from = route.departure.stationAddress || route.departure.stationName || '';

  const date_time_to = format(route.arrival.dateTime || new Date(), 'HH:mm');
  const location_to = extractLocationDetails(toLocation || route.arrival.toLocation, locale).locationName || '';
  const address_to = route.arrival.stationAddress || route.arrival.stationName || '';

  const duration = route.duration?.split(':');

  if (!isHydrated) {
    return <Skeleton className="w-full h-28" />;
  }

  return (
    <div className="flex gap-3">
      <div className="flex flex-col justify-between text-slate-700 dark:text-slate-50">
        <div className="text-sm font-bold leading-[16.8px]">{date_time_from}</div>
        <div className="text-xs font-normal text-slate-400 dark:text-slate-200 leading-[18px]">
          {(duration && `${duration[0]}:${duration[1]}`) || ''}
        </div>
        <div className="text-sm font-bold leading-[16.8px]">{date_time_to}</div>
      </div>

      <div className="w-[16px] h-[96px] shrink-0">
        <Image src={arrow} alt="arrow" className="size-full" unoptimized />
      </div>

      <div className="flex flex-col justify-between gap-4">
        <div className="space-y-0.5">
          <div className="text-slate-700 dark:text-slate-50 text-sm font-bold leading-[16.8px] tablet:text-base tablet:leading-6">
            {location_from}
          </div>
          <div className="text-xs text-slate-700 dark:text-slate-200 tablet:text-sm font-normal tablet:leading-4">
            {address_from}
          </div>
        </div>

        <div className="space-y-0.5">
          <div className="text-slate-700 dark:text-slate-50 text-sm font-bold leading-[16.8px] tablet:text-base tablet:leading-6">
            {location_to}
          </div>
          <div className="text-xs text-slate-700 dark:text-slate-200 tablet:text-sm font-normal tablet:leading-4">
            {address_to}
          </div>
        </div>
      </div>
    </div>
  );
}
