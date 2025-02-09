'use client';
import React from 'react';
import { IStops } from '@/types/stops-interface';
import { useTranslation } from 'react-i18next';

type Props = {
  isFirst?: boolean;
  isLast?: boolean;
  point: IStops;
};

export default function DetailsStopsItem({ isFirst, isLast, point }: Props) {
  const { t } = useTranslation(['search']);

  return (
    <div
      className={`relative flex items-start justify-start   ${isLast && 'overflow-hidden z-10 bg-grayy tablet:bg-white dark:bg-background_black_mode'}`}
    >
      <span
        className={`${isFirst || isLast ? 'button_mobile' : 'small_2_bolt_text'} text-text_prymery_color mr-9 min-w-[40px] max-w-[40px]`}
      >
        {isFirst
          ? point?.departure_date_time?.split(' ')[1].replace(':00', '')
          : point?.arrival_date_time?.split(' ')[1].replace(':00', '')}
      </span>

      <div
        className={`details_stops_item ${isLast ? 'before:border-primary_1' : 'before:border-blackmode before:bg-grayy dark:before:bg-background_black_mode'} `}
      >
        {isLast && (
          <span className='absolute w-[8px] h-[8px] rounded-full bg-primary_1 top-[4px] -left-[19px] -translate-x-1/2'></span>
        )}
        <div
          className={`${isFirst || isLast ? 'button_mobile' : 'small_2_bolt_text'}  text-text_prymery_color`}
        >
          {point.location.name}
        </div>

        <div className='text-text_secondary_color  text-[10px] mobile:small_text'>
          {point.station.name && `${point.station.name}, `}
          {point.station.address}
        </div>
        {!isLast && !isFirst && point.bus_changes && (
          <div className='p-1 my-0.5  text-white bg-red-500 text-xs  font-bold  rounded-lg text-center'>
            {t('organized_transfer')}
          </div>
        )}
      </div>
    </div>
  );
}
