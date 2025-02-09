'use client';

import { useCurrentRouteStore } from '@/store/useCurrentRoute';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function DetailsLuggage({ hasCardWrapp }: { hasCardWrapp?: boolean }) {
  const { t } = useTranslation(['search']);
  const сurrentRoute = useCurrentRouteStore((state) => state.сurrentRoute);

  if (!сurrentRoute?.details?.luggage_rules || сurrentRoute?.details?.luggage_rules.length === 0) {
    return null;
  }

  return (
    <div
      className={`space-y-1 ${hasCardWrapp && 'p-4 tablet:p-6 bg-card_bg_primery shadow-(--shadow-custom) rounded-2xl dark:bg-dark_mode_main1'}`}
    >
      <h5 className='h6 text-text_prymery_color'>{t('luggage')}:</h5>
      <ul className='flex flex-col gap-1'>
        {сurrentRoute?.details?.luggage_rules.map((el) => (
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
