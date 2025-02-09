"use client";

import { IconSelectArrow } from "@/components/icons/IconSelectArrow";
 import { ILocationDetails } from "@/types/location.types";
import { memo } from "react";

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
      className={`p-2 rounded-lg ${isSelected && 'bg-gray_1 dark:bg-black_2_for_text'} ${isHighlighted && 'bg-gray_1 dark:bg-black_2_for_text'}  min-w-[320px] cursor-pointer`}
      onClick={handleSelectCity}
    >
      <div className={`flex items-center justify-between gap-4`}>
        <div className='flex flex-col items-start gap-1 justify-center text-search_color min-h-[54px] text-nowrap truncate ...'>
          <div className='addional_medium_text'>{el.locationName}</div>
          <div className=''>
            {el.countryName}.{' '}
            <span className='addional_regular_text text-text_secondary_color'>{el.regionName}</span>
          </div>
        </div>
        <div>
          <IconSelectArrow />
        </div>
      </div>
    </div>
  );
});

CityItem.displayName = "CityItem";
