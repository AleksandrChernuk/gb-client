import React from 'react';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import IconSeat from '../icons/IconSeat';

type Props = {
  seat_number: string | null;
  className?: string;
  isFree?: boolean;
  available?: boolean;
  isSelected?: boolean;
  onClick: () => void;
};

export default function Seat({ seat_number, className, isSelected, isFree, available, onClick }: Props) {
  return (
    <div
      onClick={() => {
        if (available) {
          onClick();
        }
      }}
      className={cn(
        `relative cursor-pointer flex flex-col items-center dap-0.5 [&_svg]:fill-[#6f8b90] dark:[&_svg]:fill-slate-50   w-[45px] h-[55px] tablet:w-[55px] tablet:h-[65px]
        ${!isFree && '[&_svg]:fill-slate-200 dark:[&_svg]:fill-slate-700'}
        ${isSelected && '[&_svg]:fill-green-100 dark:[&_svg]:fill-green-100'}
        ${!available && 'cursor-default'}`,
        className,
      )}
    >
      <IconSeat />
      <div
        className={`${
          isSelected && 'text-green-100 dark:text-green-100'
        } -mt-10 text-base font-medium leading-4 tracking-normal text-[#6f8b90] dark:text-slate-50`}
      >
        {isFree ? seat_number : <X className={`stroke-slate-200 dark:stroke-slate-700`} />}
      </div>
    </div>
  );
}
