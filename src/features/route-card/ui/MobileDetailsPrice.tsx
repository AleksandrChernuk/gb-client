import { ReactNode } from 'react';

type Props = {
  passengerCount: number;
  currency: string;
  placeholderPassenger: string;
  selectButton: ReactNode;
  price: number;
};

export const MobileDetailsPrice = ({ passengerCount, placeholderPassenger, selectButton, currency, price }: Props) => {
  return (
    <>
      <div className="mx-auto text-center">
        <div className="text-xs font-normal tracking-normal leading-[18px] text-[#6f8b90] dark:text-slate-50">
          {passengerCount} {placeholderPassenger}
        </div>
        <div className="text-base font-normal leading-6 tracking-normal text-slate-700 dark:text-slate-200">
          {price} <span className="text-xs ml-[2px]">{currency}</span>
        </div>
      </div>
      <div className="w-1/2">{selectButton}</div>
    </>
  );
};
