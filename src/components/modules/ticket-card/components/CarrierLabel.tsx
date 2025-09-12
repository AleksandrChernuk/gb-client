import { IconCarriersBus } from '@/assets/icons/IconCarriersBus';
import React from 'react';

const CarrierLabel = ({ carrierName }: { carrierName: string }) => {
  return (
    <div className="flex items-center gap-2 text-xs font-normal tracking-normal leading-[18px] text-slate-700 dark:text-slate-50 shrink grow-0 text-nowrap truncate ...">
      <div className="w-[45px] h-[16px] tablet:w-[70px] tablet:h-[24px] grow-0">
        <IconCarriersBus />
      </div>

      <span className="block text-[10px] tablet:text-xs font-normal tracking-normal leading-[18px] break-all text-slate-700 dark:text-slate-50">
        {carrierName}
      </span>
    </div>
  );
};

export default CarrierLabel;
