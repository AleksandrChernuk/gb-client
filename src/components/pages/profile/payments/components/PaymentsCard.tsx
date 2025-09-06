'use client';

import { UserCustomerType, UserPaymentType } from '@/types/payments.Info.types';
import arrow from '@/assets/icons/arrow-mobile.svg';
import Image from 'next/image';
import { format } from 'date-fns';
import useDateLocale from '@/hooks/useDateLocale';
import { Mail, Phone, User } from 'lucide-react';
import { IconRouteLeft } from '@/assets/icons/IconRouteLeft';
import { IconRouteRigth } from '@/assets/icons/IconRouteRigth';

type Props = {
  item: UserPaymentType;
  customer: UserCustomerType;
};
const PaymentsCard = ({ item, customer }: Props) => {
  const { locale } = useDateLocale();

  return (
    <div className="border border-slate-50 dark:border-slate-700 p-4 bg-white shadow-xs tablet:p-4 dark:bg-slate-800 rounded-2xl ">
      <p className="text-base tablet:text-lg font-normal text-slate-700 dark:text-slate-50 mb-2">
        № {item.myOrderNumber.padStart(9, '0')}
      </p>

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
                    {item.fromCountry}
                  </p>
                </div>
                <div className="text-xs font-normal tracking-normal leading-[18px] ttext-slate-700 dark:text-slate-50">
                  {format(item.departureDateTime || new Date(), 'HH:mm')},{' '}
                  {format(item.departureDateTime || new Date(), 'dd MMM', { locale: locale })}
                </div>
                <div>
                  <p className="text-slate-700 dark:text-slate-50 text-sm font-bold tracking-normal leading-[16.8px] tablet:text-xl laptop:text-2xl tablet:leading-6">
                    {item.toCityName}
                  </p>
                  <p className="text-xs tablet:text-base laptop:text-lg font-normal tracking-normal leading-[18px] text-slate-400 dark:text-slate-20">
                    {item.toCountry}
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
              <div className="text-base font-bold leading-6 tracking-normal laptop:text-2xl laptop:font-medium laptop:leading-[28.8px] text-slate-700 dark:text-slate-50">
                {item.fromCountry}
              </div>
            </div>

            <div className="flex items-center justify-center gap-1">
              <div className="w-[50px] h-[17px]">
                <IconRouteLeft />
              </div>
              <div className="text-xs font-normal tracking-normal leading-[18px] text-slate-700 dark:text-slate-200">
                {format(item.departureDateTime || new Date(), 'HH:mm')},{' '}
                {format(item.departureDateTime || new Date(), 'dd.MM', { locale: locale })}
              </div>
              <div className="w-[50px] h-[17px]">
                <IconRouteRigth />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-2xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
                {item.toCityName}
              </div>
              <div className="text-base font-bold leading-6 tracking-normal laptop:text-2xl laptop:font-medium laptop:leading-[28.8px] text-slate-700 dark:text-slate-50">
                {item.toCountry}
              </div>
            </div>
          </div>

          <div>
            <div className="text-2xl font-medium tracking-normal leading-[28.8px] tablet:text-[32px] tablet:leading-[38.4px] text-slate-700 dark:text-slate-50">
              {item.paymentAmount}
              <span className="text-xs ml-[2px]">{item.currency}</span>
            </div>
            <p className="text-sm font-bold text-green-300">{item.paymentProvider}</p>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#e6e6e6] dark:bg-slate-700 rounded-2xl relative my-4" />

        <div className="flex justify-between flex-wrap gap-2">
          <div className="flex flex-col gap-2">
            <p className="inline-flex gap-1 items-center text-sm font-normal tracking-normal leading-[18px] text-slate-400 dark:text-slate-20">
              <User /> {customer.firstName} {customer.lastName}
            </p>
            <p className="inline-flex gap-1 items-center text-sm font-normal tracking-normal leading-[18px] text-slate-400 dark:text-slate-20">
              <Mail /> {customer.email}
            </p>
          </div>
          <div>
            <p className="inline-flex gap-1 items-center text-sm font-normal tracking-normal leading-[18px] text-slate-400 dark:text-slate-20">
              <Phone /> {customer.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsCard;
