'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useLocale } from 'next-intl';
import { format } from 'date-fns';
import { extractLocationDetails } from '@/lib/extractLocationDetails';
import Image from 'next/image';
import arrow from '@/assets/icons/arrow-mobile.svg';
import { useSelectedTickets } from '@/store/useSelectedTickets';

export default function Trip() {
  const selectedTicket = useSelectedTickets((state) => state.selectedTicket);
  const isHydrated = useSelectedTickets((state) => state.isHydrated);

  const locale = useLocale();

  if (!selectedTicket) return null;

  const date_time_from = format(selectedTicket.departure.date_time || new Date(), 'HH:mm');
  const location_from = extractLocationDetails(selectedTicket.departure.fromLocation, locale).locationName || '';
  const address_from = selectedTicket.departure.station_address || '';

  const date_time_to = format(selectedTicket.arrival.date_time || new Date(), 'HH:mm');
  const location_to = extractLocationDetails(selectedTicket.arrival.toLocation, locale).locationName || '';
  const address_to = selectedTicket.arrival.station_address || '';

  const duration = selectedTicket.duration?.split(':');

  return (
    <div>
      {isHydrated ? (
        <div className="flex gap-3">
          <div className="flex flex-col justify-between text-slate-700 dark:text-slate-50">
            <div className="text-sm font-bold tracking-normal leading-[16.8px]">{date_time_from}</div>
            <div className="text-xs font-normal tracking-normal leading-[18px] text-slate-400 dark:text-slate-200">
              {(duration && `${duration[0]}:${duration[1]}`) || ''}
            </div>
            <div className="text-sm font-bold tracking-normal leading-[16.8px]">{date_time_to}</div>
          </div>

          <div className="w-[16px] h-[96px] shrink-0">
            <Image src={arrow} alt="arrow" className="size-full" unoptimized />
          </div>

          <div className="flex flex-col justify-between gap-4">
            <div className="space-y-0.5">
              <div className="flex items-center text-slate-700 dark:text-slate-50 text-sm font-bold tracking-normal leading-[16.8px] tablet:text-base tablet:leading-6">
                {location_from}
              </div>
              <div className="text-xs tracking-normal leading-[18px] text-slate-700 dark:text-slate-200 tablet:text-sm font-normal tablet:leading-4">
                {address_from}
              </div>
            </div>

            <div className="space-y-0.5">
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
        <Skeleton className="w-full h-28" />
      )}
    </div>
  );
}
