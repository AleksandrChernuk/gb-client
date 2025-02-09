'use client';
import { useCurrentRouteStore } from '@/store/useCurrentRoute';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function DetailsAmenities({ hasCardWrapp }: { hasCardWrapp?: boolean }) {
  const сurrentRoute = useCurrentRouteStore((state) => state.сurrentRoute);
  const { t } = useTranslation(['search']);

  if (!сurrentRoute?.details?.amenities || сurrentRoute?.details?.amenities.length === 0) {
    return null;
  }

  return (
    <div
      className={`space-y-1 ${hasCardWrapp && 'p-4 tablet:p-6 bg-card_bg_primery shadow-(--shadow-custom) rounded-2xl'}`}
    >
      <h5 className='h6 text-text_prymery_color'>{t('amenities')}:</h5>
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
