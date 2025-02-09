'use client';

import { useCurrentRouteStore } from '@/store/useCurrentRoute';
import { useTranslation } from 'react-i18next';

export default function DetailsDiscounts({ hasCardWrapp }: { hasCardWrapp?: boolean }) {
  const сurrentRoute = useCurrentRouteStore((state) => state.сurrentRoute);
  const { t } = useTranslation(['common']);

  if (
    !сurrentRoute?.details?.discounts ||
    сurrentRoute.details.discounts.length === 0 ||
    !сurrentRoute?.details?.discounts[0].description
  ) {
    return null;
  }

  return (
    <div
      className={`space-y-1 ${hasCardWrapp && 'p-4 tablet:p-6 bg-card_bg_primery shadow-(--shadow-custom) rounded-2xl'}`}
    >
      <h5 className='h6 text-text_prymery_color'>{t('discounts')}:</h5>
      <ul className='flex flex-row flex-wrap gap-0.5'>
        {сurrentRoute?.details?.discounts.map((el) => (
          <li
            key={el.id}
            className='text-wrap text-text_secondary_color  text-[10px] mobile:small_text'
          >
            {el.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
