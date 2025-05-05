'use client';

import { IRouteResponse } from '@/types/route.types';
import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { format } from 'date-fns';
import { useLocale, useTranslations } from 'next-intl';
import { IconRouteLeft } from '../icons/IconRouteLeft';
import { IconRouteRigth } from '../icons/IconRouteRigth';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MESSAGE_FILES } from '@/constans/message.file.constans';

type Props = {
  route: IRouteResponse;
};

export default function TicketRoute({ route }: Props) {
  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);
  const matches = useMediaQuery('(max-width: 767px)');

  const locale = useLocale();

  const date_time_from = format(route.departure.date_time || new Date(), 'HH:mm');
  const location_from = extractLocationDetails(route.departure.fromLocation, locale).locationName || '';
  const address_from = route.departure.station_address || '';

  const date_time_to = format(route.arrival.date_time || new Date(), 'HH:mm');
  const location_to = extractLocationDetails(route.arrival.toLocation, locale).locationName || '';
  const address_to = route.arrival.station_address || '';

  const duration = route.duration?.split(':');

  return (
    <>
      {matches ? (
        <div className="flex">
          <div className="flex flex-col justify-between text-slate-700 dark:text-slate-50">
            <div className="text-sm font-bold tracking-normal leading-[16.8px]">{date_time_from}</div>
            <div className="text-xs font-normal tracking-normal leading-[18px] text-slate-400 dark:text-slate-200">
              {(duration && `${duration[0]}:${duration[1]}`) || ''}
            </div>
            <div className="text-sm font-bold tracking-normal leading-[16.8px]">{date_time_to}</div>
          </div>

          <div className="flex flex-col justify-between gap-4">
            <div className="pl-8 space-y-0.5 relative poit_from poit_divider">
              <div className="flex items-center text-slate-700 dark:text-slate-50 text-sm font-bold tracking-normal leading-[16.8px] tablet:text-base tablet:leading-6">
                {location_from}
              </div>
              <div className="text-xs tracking-normal leading-[18px] text-slate-700 dark:text-slate-200 tablet:text-sm font-normal tablet:leading-4">
                {address_from}
              </div>
            </div>

            <div className="pl-8 space-y-0.5 relative poit_to_wrapp poit_to">
              <div className="flex items-center text-slate-700 dark:text-slate-50 text-sm font-bold tracking-normal leading-[16.8px] tablet:text-base tablet:leading-6">
                {location_to}
              </div>
              <div className="text-xs leading-[18px] text-slate-700 dark:text-slate-200 tablet:text-sm font-normal tablet:leading-4 tracking-normal">
                {address_to}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid justify-between w-full grid-cols-3 gap-2">
          <div className="flex flex-col gap-1">
            <div className="text-2xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
              {date_time_from}
            </div>
            <div className="text-base font-bold leading-6 tracking-normal laptop:text-2xl laptop:font-medium laptop:leading-[28.8px] text-slate-700 dark:text-slate-50">
              {location_from}
            </div>
            <div className="text-sm font-normal leading-4 tracking-normal text-slate-400 dark:text-slate-200 text-wrap">
              {address_from}
            </div>
          </div>

          <div className="flex items-center justify-center gap-1">
            <div className="w-[50px] h-[17px]">
              <IconRouteLeft />
            </div>
            <div className="text-xs font-normal tracking-normal leading-[18px] text-slate-700 dark:text-slate-200">
              {(duration && `${duration[0]}${t('shortHours')}:${duration[1]}${t('shortMinutes')}`) || ''}
            </div>
            <div className="w-[50px] h-[17px]">
              <IconRouteRigth />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-2xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
              {date_time_to}
            </div>
            <div className="text-base font-bold leading-6 tracking-normal laptop:text-2xl laptop:font-medium laptop:leading-[28.8px] text-slate-700 dark:text-slate-50">
              {location_to}
            </div>
            <div className="text-sm font-normal leading-4 tracking-normal text-slate-400 dark:text-slate-200 text-wrap">
              {address_to}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
