'use client';

import { UserCustomerType, UserPaymentType } from '@/types/payments.Info.types';

import { Mail, Phone, User } from 'lucide-react';

type Props = {
  item: UserPaymentType;
  customer: UserCustomerType;
};

const PaymentsCard = ({ item, customer }: Props) => {
  return (
    <div className="border border-slate-50 dark:border-slate-700 p-4 bg-white shadow-xs tablet:p-4 dark:bg-slate-800 rounded-2xl ">
      <p className="text-base tablet:text-lg font-normal text-green-300 dark:text-green-100 mb-2">
        № {item.myOrderNumber.padStart(9, '0')}
      </p>

      <div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-base font-normal tracking-normal leading-[18px] tablet:leading-4 text-green-300 dark:text-green-100">
              Платник
            </p>
            <p className="text-lg tablet:text-xl laptop:text-2xl font-bold tracking-normal tablet:leading-6 text-slate-700 dark:text-slate-50">
              {customer.firstName} {customer.lastName}
            </p>
          </div>

          <div>
            <div className="text-2xl font-medium tracking-normal leading-[28.8px] tablet:text-[32px] tablet:leading-[38.4px] text-slate-700 dark:text-slate-50">
              {Math.floor(Number(item.paymentAmount || 0))}
              <span className="text-xs ml-[2px]">{item.currency}</span>
            </div>
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
