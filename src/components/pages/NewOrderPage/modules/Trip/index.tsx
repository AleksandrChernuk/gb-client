/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';
import { format } from 'date-fns';
import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { useCurrentRouteStore } from '@/store/useCurrentRoute';
import React from 'react';
import IconArrowRoteMobile from '@/components/pages/SearchPage/images/IconArrowRoteMobile';

export default function Trip() {
  const сurrentRoute = useCurrentRouteStore((state) => state.сurrentRoute);

  return (
    <div className='flex flex-row items-center gap-2 '>
      <div className='flex flex-col items-center gap-4'>
        <div className='button_mobile text-text_prymery_color'>
          {format(new Date(сurrentRoute?.departure?.date_time || new Date()), 'HH:mm')}
        </div>

        {/* <div className='small_text text-black.2.for.text  dark:text-gray_1'>{`${durationArr[0]}${t('shortHours')},${durationArr[1]}${t('shortMinutes')}`}</div> */}
        <div className='button_mobile text-text_prymery_color'>
          {format(new Date(сurrentRoute?.departure?.date_time || new Date()), 'HH:mm')}
        </div>
      </div>

      <div className='w-3 h-full'>
        <IconArrowRoteMobile />
      </div>

      <div className='space-y-2'>
        <div>
          <div className='body_medium text-text_prymery_color'>
            {
              //@ts-ignore
              сurrentRoute ? (
                extractLocationDetails(сurrentRoute?.departure?.fromLocation, 'uk').countryName
              ) : (
                <div>Loading</div>
              )
            }
          </div>
          <div className='text-[10px] leading-4 text-text_secondary_color  text-wrap'>
            {сurrentRoute?.departure.station_address}
          </div>
        </div>

        <div>
          <div className='body_medium text-text_prymery_color'>
            {
              //@ts-ignore
              сurrentRoute ? (
                extractLocationDetails(сurrentRoute?.arrival?.toLocation, 'uk').countryName
              ) : (
                <div>Loading</div>
              )
            }
          </div>
          <div className='text-[10px] leading-4 text-text_secondary_color  text-wrap'>
            {сurrentRoute?.arrival.station_address}
          </div>
        </div>
      </div>
    </div>
  );
}
