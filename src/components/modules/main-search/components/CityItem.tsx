'use client';

import { IconSelectArrow } from '@/components/icons/IconSelectArrow';
import { ILocationDetails } from '@/types/location.types';
import clsx from 'clsx';
import { memo } from 'react';

type Props = {
  el: ILocationDetails;
  isSelected: boolean;
  handleSelectCity: () => void;
  isHighlighted?: boolean;
  hasBorder?: boolean;
};

export const CityItem = memo(({ el, isSelected, handleSelectCity, isHighlighted, hasBorder }: Props) => {
  return (
    <div
      className={clsx(
        'z-0 p-2 rounded-lg flex items-center justify-between gap-1 cursor-pointer h-20 w-full',
        (isHighlighted || isSelected) && 'dark:bg-slate-700 bg-slate-200',
        hasBorder && 'border border-slate-300 dark:border-slate-600',
      )}
      onClick={handleSelectCity}
    >
      <div className="space-y-1 dark:text-slate-50 text-black text-nowrap truncate">
        <div className="text-base font-medium leading-4 tracking-normal">{el.locationName}</div>
        <div className="truncate">
          {el.countryName}.{' '}
          <span className="text-sm font-normal leading-4 tracking-normal text-slate-400 dark:text-slate-200">
            {el.regionName}
          </span>
        </div>
      </div>
      <IconSelectArrow />
    </div>
  );
});

CityItem.displayName = 'CityItem';
