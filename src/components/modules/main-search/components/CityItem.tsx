'use client';

import { IconSelectArrow } from '@/components/icons/IconSelectArrow';
import { ILocationDetails } from '@/types/location.types';
import { memo } from 'react';

type Props = {
  el: ILocationDetails;
  isSelected: boolean;
  handleSelectCity: () => void;
  isHighlighted?: boolean;
  hasBorder?: boolean;
};

export const CityItem = memo(({ el, isSelected, handleSelectCity, isHighlighted }: Props) => {
  return (
    <div
      className={`p-2 rounded-lg ${isSelected && 'bg-slate-200 dark:bg-slate-700 '} ${
        isHighlighted && 'bg-slate-200 dark:bg-slate-700 '
      }  min-w-[320px] cursor-pointer`}
      onClick={handleSelectCity}
    >
      <div className={`flex items-center justify-between gap-4`}>
        <div className="flex flex-col items-start gap-1 justify-center text-slate-50 dark:text-black min-h-[54px] text-nowrap truncate ...">
          <div className="text-base font-medium leading-4 tracking-normal">{el.locationName}</div>
          <div className="">
            {el.countryName}.{' '}
            <span className="text-sm font-normal leading-4 tracking-normal text-text_secondary">{el.regionName}</span>
          </div>
        </div>
        <div>
          <IconSelectArrow />
        </div>
      </div>
    </div>
  );
});

CityItem.displayName = 'CityItem';
