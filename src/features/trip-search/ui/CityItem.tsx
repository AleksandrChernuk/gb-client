'use client';

import { IconSelectArrow } from '@/assets/icons/IconSelectArrow';
import { ILocationDetails } from '@/shared/types/location.types';
import { cn } from '@/shared/lib/utils';
import { memo } from 'react';

type Props = {
  el: ILocationDetails;
  isSelected: boolean;
  isHighlighted?: boolean;
  hasBorder?: boolean;
  onSelect: () => void;
};

export const CityItem = memo(({ el, isSelected, isHighlighted, hasBorder, onSelect }: Props) => {
  return (
    <div
      role="option"
      aria-selected={isSelected}
      onClick={onSelect}
      className={cn(
        'p-2 rounded-lg flex items-center justify-between gap-1 cursor-pointer h-20 w-full',
        'transition-colors duration-100',
        (isHighlighted || isSelected) && 'bg-slate-200 dark:bg-slate-700',
        hasBorder && 'border border-slate-300 dark:border-slate-600',
      )}
    >
      <div className="space-y-1 text-black dark:text-slate-50 min-w-0 flex-1">
        <p className="text-base font-medium leading-4 tracking-normal truncate">{el.locationName}</p>
        <p className="text-sm leading-4 tracking-normal truncate">
          <span>{el.countryName}. </span>
          <span className="text-slate-400 dark:text-slate-200">{el.regionName}</span>
        </p>
      </div>
      <IconSelectArrow />
    </div>
  );
});

CityItem.displayName = 'CityItem';
