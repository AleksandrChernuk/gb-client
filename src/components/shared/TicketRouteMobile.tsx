'use client';

import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { cn } from '@/lib/utils';
import { IRouteResponse } from '@/types/route.types';
import { format } from 'date-fns';
import { useLocale } from 'next-intl';

type TLocation = {
  className?: string;
  location: string;
  address: string;
  last?: boolean;
};

type TTicketRouteMobile = {
  route: IRouteResponse | null;
  className?: string;
};

type TDateDuration = {
  departure: string;
  duration: string;
  arrival: string;
};

const DateDuration = ({ departure, duration, arrival }: TDateDuration) => {
  return (
    <div className="flex flex-col justify-between text-slate-700 dark:text-slate-50">
      <div className="text-sm font-bold tracking-normal leading-[16.8px]">{departure}</div>
      <div className="text-xs font-normal tracking-normal leading-[18px] text-slate-400 dark:text-slate-200">
        {duration}
      </div>
      <div className="text-sm font-bold tracking-normal leading-[16.8px]">{arrival}</div>
    </div>
  );
};

const Location = ({ location, address, className, last }: TLocation) => {
  return (
    <div
      className={cn(
        `pl-8 space-y-0.5 relative after:content-[''] before:absolute after:rounded-full before:border-[2px] before:w-4 before:h-4 before:top-0 before:left-4 before:-translate-x-1/2 before:rounded-full before:z-20 ${last ? 'before:border-green-300' : 'before:border-slate-600 before:bg-slate-50 dark:before:bg-slate-900'}`,
        className,
      )}
    >
      <div className="flex items-center text-slate-700 dark:text-slate-50 text-sm font-bold tracking-normal leading-[16.8px] tablet:text-base tablet:leading-6">
        {location}
      </div>
      <div className="text-xs font-normal tracking-normal leading-[18px] text-slate-700 dark:text-slate-200 tablet:text-sm tablet:leading-4">
        {address}
      </div>
    </div>
  );
};

export default function TicketRouteMobile({ route, className }: TTicketRouteMobile) {
  const locale = useLocale();

  if (!route) {
    return null;
  }

  const duration = route.duration?.split(':');

  return (
    <div className={cn('flex tablet:hidden', className)}>
      <DateDuration
        arrival={format(new Date(route?.arrival?.dateTime || new Date()), 'HH:mm')}
        departure={format(new Date(route?.departure?.dateTime || new Date()), 'HH:mm')}
        duration={(duration && `${duration[0]}:${duration[1]}`) || ''}
      />

      <div className="flex flex-col justify-between gap-4">
        <Location
          className="poit_from poit_divider"
          location={
            (route?.departure?.fromLocation &&
              extractLocationDetails(route?.departure?.fromLocation, locale).locationName) ||
            ''
          }
          address={route?.departure.stationAddress || ''}
        />

        <Location
          last
          className="poit_to_wrapp poit_to"
          location={
            (route?.arrival?.toLocation && extractLocationDetails(route?.arrival?.toLocation, locale).locationName) ||
            ''
          }
          address={route?.arrival.stationAddress || ''}
        />
      </div>
    </div>
  );
}
