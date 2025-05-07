'use client';

import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { cn } from '@/lib/utils';
import { IRouteResponse } from '@/types/route.types';
import { format } from 'date-fns';
import { useLocale, useTranslations } from 'next-intl';

type TLocation = {
  className?: string;
  location: string;
  address: string;
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

const Location = ({ location, address, className }: TLocation) => {
  return (
    <div className={cn(`pl-8 space-y-0.5 relative`, className)}>
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
  const t = useTranslations(MESSAGE_FILES.COMMON);
  const locale = useLocale();

  if (!route) {
    return null;
  }

  const duration = route.duration?.split(':');

  return (
    <div className={cn('flex tablet:hidden', className)}>
      <DateDuration
        arrival={format(new Date(route?.arrival?.date_time || new Date()), 'HH:mm')}
        departure={format(new Date(route?.departure?.date_time || new Date()), 'HH:mm')}
        duration={(duration && `${duration[0]}${t('shortHours')}:${duration[1]}${t('shortMinutes')}`) || ''}
      />

      <div className="flex flex-col justify-between gap-4">
        <Location
          className="poit_from poit_divider"
          location={
            (route?.departure?.fromLocation &&
              extractLocationDetails(route?.departure?.fromLocation, locale).locationName) ||
            ''
          }
          address={route?.departure.station_address || ''}
        />

        <Location
          className="poit_to_wrapp poit_to"
          location={
            (route?.arrival?.toLocation && extractLocationDetails(route?.arrival?.toLocation, locale).locationName) ||
            ''
          }
          address={route?.arrival.station_address || ''}
        />
      </div>
    </div>
  );
}
