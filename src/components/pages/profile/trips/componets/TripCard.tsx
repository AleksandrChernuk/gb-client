'use client';

import arrow from '@/assets/icons/arrow-mobile.svg';
import Image from 'next/image';
import { format } from 'date-fns';
import useDateLocale from '@/hooks/useDateLocale';
import { IconRouteLeft } from '@/assets/icons/IconRouteLeft';
import { IconRouteRigth } from '@/assets/icons/IconRouteRigth';
import { UserCurrentTripType } from '@/types/profile.trips';
import { IconCarriersBus } from '@/assets/icons/IconCarriersBus';

type Props = {
  item: UserCurrentTripType;
};

export const TripCard = ({ item }: Props) => {
  const { locale } = useDateLocale();

  return (
    <div className="border border-slate-50 dark:border-slate-700 p-4 bg-white shadow-xs tablet:p-4 dark:bg-slate-800 rounded-2xl ">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 tablet:hidden">
            <div className="w-[26px] laptop:w-10 h-[80px] laptop:h-24 shrink-0">
              <Image src={arrow} alt="arrow" className="size-full" unoptimized />
            </div>
            <div>
              <div className="flex flex-col justify-between gap-2 tablet:gap-3 ">
                <div>
                  <p className="text-slate-700 dark:text-slate-50 text-sm font-bold tracking-normal leading-[16.8px] tablet:text-xl laptop:text-2xl tablet:leading-6">
                    {item.fromCityName}
                  </p>
                  <p className="text-xs tablet:text-base laptop:text-lg font-normal tracking-normal leading-[18px] text-slate-400 dark:text-slate-20">
                    {item.fromStationAddress}
                  </p>
                </div>
                <div className="text-xs font-normal tracking-normal leading-[18px] ttext-slate-700 dark:text-slate-50">
                  {item.duration}
                </div>
                <div>
                  <p className="text-slate-700 dark:text-slate-50 text-sm font-bold tracking-normal leading-[16.8px] tablet:text-xl laptop:text-2xl tablet:leading-6">
                    {item.toCityName}
                  </p>
                  <p className="text-xs tablet:text-base laptop:text-lg font-normal tracking-normal leading-[18px] text-slate-400 dark:text-slate-20">
                    {item.toStationAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden tablet:grid justify-between w-full grid-cols-3 gap-2">
            <div className="flex flex-col gap-1">
              <div className="text-2xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
                {item.fromCityName}
              </div>
              <div className="text-sm font-normal leading-4 tracking-normal text-slate-400 dark:text-slate-200 text-wrap">
                {item.fromStationAddress}
              </div>
            </div>

            <div className="flex items-center justify-center gap-1">
              <div className="w-[50px] h-[17px]">
                <IconRouteLeft />
              </div>
              <div className="text-xs font-normal tracking-normal leading-[18px] text-slate-700 dark:text-slate-200">
                {item.duration}
              </div>
              <div className="w-[50px] h-[17px]">
                <IconRouteRigth />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-2xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
                {item.toCityName}
              </div>
              <div className="text-sm font-normal leading-4 tracking-normal text-slate-400 dark:text-slate-200 text-wrap">
                {item.toStationAddress}
              </div>
            </div>
          </div>

          <div>
            <div className="text-2xl font-medium tracking-normal leading-[28.8px] tablet:text-[32px] tablet:leading-[38.4px] text-slate-700 dark:text-slate-50">
              {item.totalPrice}
              <span className="text-xs ml-[2px]">{item.currency}</span>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#e6e6e6] dark:bg-slate-700 rounded-2xl relative my-4" />

        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-xs font-normal tracking-normal leading-[18px] text-slate-700 dark:text-slate-50 shrink grow-0 text-nowrap truncate ...">
            <div className="w-[45px] h-[16px] tablet:w-[70px] tablet:h-[24px] grow-0">
              <IconCarriersBus />
            </div>

            <span className="block text-[10px] tablet:text-xs font-normal tracking-normal leading-[18px] break-all text-slate-700 dark:text-slate-50">
              {item.carrierName || ''}
            </span>
          </div>
          <div className="break-all text-xs font-normal tracking-normal leading-[18px] text-slate-700 dark:text-slate-50">
            {format(item.departureDateTime || new Date(), 'HH:mm')},{' '}
            {format(item.departureDateTime || new Date(), 'dd MMM', { locale: locale })}
          </div>
        </div>
      </div>
    </div>
  );
};
