import { useCurrentRouteStore } from '@/store/useCurrentRoute';
import React from 'react';

export default function DetailsAmenities({ hasCardWrapp }: { hasCardWrapp?: boolean }) {
  const сurrentRoute = useCurrentRouteStore((state) => state.сurrentRoute);

  if (!сurrentRoute?.details?.amenities || сurrentRoute?.details?.amenities.length === 0) {
    return null;
  }
  return (
    <div
      className={`space-y-1 ${hasCardWrapp && 'p-4 tablet:p-6 bg-card_bg_primery shadow-(--shadow-custom) rounded-2xl'}`}
    >
      <h5 className='h5'>Amenities:</h5>
      <ul className='flex flex-row flex-wrap gap-2'>
        {сurrentRoute?.details?.amenities.map((el) => (
          <li
            key={el}
            className='text-wrap text-text_secondary_color  text-[10px] mobile:small_text'
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}
