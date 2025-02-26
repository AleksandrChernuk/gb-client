'use client';

import { format, toDate } from 'date-fns';
import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import useDateLocale from '@/hooks/useDateLocale';
import { useCurrentTicketStore } from '@/store/useCurrentTicket';

export default function Trip() {
  const selectedTicket = useCurrentTicketStore((state) => state.selectedTicket);
  const locale = useLocale();
  const { locale: ld } = useDateLocale();

  if (!selectedTicket) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1 addional_regular_text text-primary laptop:hidden">
        <span>
          {format(toDate(selectedTicket?.departure?.date_time || new Date()), 'eee ,d MMM', {
            locale: ld,
          })}
        </span>
        <ArrowRight size={12} className="stroke-primary" />
        <span>
          {format(toDate(selectedTicket?.arrival?.date_time || new Date()), 'eee ,d MMM', {
            locale: ld,
          })}
        </span>
      </div>

      <div className="flex flex-row items-start gap-2">
        <div className={`relative space-y-2 laptop:space-y-4`}>
          <div className="flex items-center">
            <div className="hidden laptop:block text-black_2_for_text dark:text-grayy button_mobile tablet:h5">
              {format(new Date(selectedTicket?.departure?.date_time || new Date()), 'HH:mm')}
              <span className="block text-nowrap small_text">
                {format(toDate(selectedTicket?.departure?.date_time || new Date()), 'd MMM', {
                  locale: ld,
                })}
              </span>
            </div>

            <div className={`pl-10 space-y-0.5 relative poit_from poit_divider`}>
              <p className="flex items-center text-black_2_for_text dark:text-grayy button_mobile tablet:h5">
                {extractLocationDetails(selectedTicket?.departure?.fromLocation, locale).locationName}
                <span className="block laptop:hidden">
                  , {format(new Date(selectedTicket?.departure?.date_time || new Date()), 'HH:mm')}
                </span>
              </p>
              <p className="small_text text-black_2_for_text dark:text-gray_1 tablet:addional_regular_text">
                {selectedTicket?.departure.station_address}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="hidden laptop:block text-black_2_for_text dark:text-grayy button_mobile tablet:h5 ">
              {format(new Date(selectedTicket?.arrival?.date_time || new Date()), 'HH:mm')}
              <span className="block text-nowrap small_text">
                {format(toDate(selectedTicket?.arrival?.date_time || new Date()), 'd MMM', {
                  locale: ld,
                })}
              </span>
            </div>

            <div className={`pl-10 space-y-0.5 relative poit_to_wrapp poit_to`}>
              <p className="flex items-center text-black_2_for_text dark:text-white button_mobile tablet:h5">
                {extractLocationDetails(selectedTicket?.arrival?.toLocation, locale).locationName}
                <span className="block laptop:hidden">
                  , {format(new Date(selectedTicket?.arrival?.date_time || new Date()), 'HH:mm')}
                </span>
              </p>
              <p className="small_text text-black_2_for_text dark:text-white tablet:addional_regular_text">
                {selectedTicket?.arrival.station_address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
