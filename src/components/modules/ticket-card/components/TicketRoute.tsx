'use client';

import { IRouteResponse } from '@/types/route.types';
import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { format } from 'date-fns';
import { useLocale, useTranslations } from 'next-intl';
import { IconRouteLeft } from '../icons/IconRouteLeft';
import { IconRouteRigth } from '../icons/IconRouteRigth';

type Props = {
  route: IRouteResponse;
};

export default function TicketRoute({ route }: Props) {
  const t = useTranslations('buses');
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
      <div className="justify-between hidden w-full grid-cols-3 gap-2 tablet:grid">
        <div className="flex flex-col gap-1">
          <div className="h3 laptop:h1 text-text_prymery">{date_time_from}</div>
          <div className="h5 laptop:h4 text-text_prymery">{location_from}</div>
          <div className="addional_regular_text text-text_secondary text-wrap">{address_from}</div>
        </div>

        <div className="flex items-center justify-center gap-1">
          <div className="w-[50px] h-[17px]">
            <IconRouteLeft />
          </div>
          <div className="small_text text-black_2_for_text dark:text-gray_1">
            {(duration && `${duration[0]}${t('shortHours')}:${duration[1]}${t('shortMinutes')}`) || ''}
          </div>
          <div className="w-[50px] h-[17px]">
            <IconRouteRigth />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="h3 laptop:h1 text-text_prymery">{date_time_to}</div>
          <div className="h5 laptop:h4 text-text_prymery">{location_to}</div>
          <div className="addional_regular_text text-text_secondary text-wrap">{address_to}</div>
        </div>
      </div>

      <div className="flex tablet:hidden">
        <div className="flex flex-col justify-between text-text_prymery">
          <div className="button_mobile">{date_time_from}</div>
          <div className="small_text text-text_secondary">{(duration && `${duration[0]}:${duration[1]}`) || ''}</div>
          <div className="button_mobile">{date_time_to}</div>
        </div>

        <div className="flex flex-col justify-between gap-4">
          <div className="pl-8 space-y-0.5 relative poit_from poit_divider">
            <div className="flex items-center text-black_2_for_text dark:text-grayy button_mobile tablet:h5">
              {location_from}
            </div>
            <div className="small_text text-black_2_for_text dark:text-gray_1 tablet:addional_regular_text">
              {address_from}
            </div>
          </div>

          <div className="pl-8 space-y-0.5 relative poit_to_wrapp poit_to">
            <div className="flex items-center text-black_2_for_text dark:text-grayy button_mobile tablet:h5">
              {location_to}
            </div>
            <div className="small_text text-black_2_for_text dark:text-gray_1 tablet:addional_regular_text">
              {address_to}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
