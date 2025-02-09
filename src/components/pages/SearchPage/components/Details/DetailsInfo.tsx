'use client';

import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { useCurrentRouteStore } from '@/store/useCurrentRoute';
import { format } from 'date-fns';
import { ChevronRight, Clock3, Route } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function DetailsInfo({ hasCardWrapp }: { hasCardWrapp?: boolean }) {
  const { t, i18n } = useTranslation(['common']);
  const сurrentRoute = useCurrentRouteStore((state) => state.сurrentRoute);

  const durationArr = сurrentRoute?.duration?.split(':') ?? '';

  return (
    <div
      className={`space-y-1 ${hasCardWrapp && 'p-4 tablet:p-6 bg-card_bg_primery shadow-(--shadow-custom) rounded-2xl'}`}
    >
      <div className='gap-2 flex_center'>
        <h5 className='h6 text-text_prymery_color'>{t('route')}:</h5>

        <div className='flex_center gap-2 text-primary_1 text-text-text_secondary_color text-[10px] mobile:small_text'>
          {` ${format(сurrentRoute?.departure.date_time || new Date(), 'EEE dd')}, 
                  ${сurrentRoute && extractLocationDetails(сurrentRoute?.departure.fromLocation, i18n.language).locationName}`}
          <ChevronRight size={16} className='stroke-primary_1' />
          {` ${format(сurrentRoute?.arrival.date_time || new Date(), 'EEE dd')}, 
                 ${сurrentRoute && extractLocationDetails(сurrentRoute?.arrival.toLocation, i18n.language).locationName}`}
        </div>
      </div>

      <div className='gap-2 flex_center text-text_secondary_color text-[10px] mobile:small_text'>
        <Route className='rotate-90 stroke-gray_2_for_body dark:stroke-gray_1' size={16} />
        <span>{t('travel_time')}:</span>
        <span>{`${durationArr[0]}${t('shortHours')},${durationArr[1]}${t('shortMinutes')}`}</span>
      </div>

      <div className='gap-2 flex_center '>
        <Clock3 className='stroke-gray_2_for_body dark:stroke-gray_1' size={16} />
        <p className='text-wrap text-text_secondary_color  text-[10px] mobile:small_text'>
          {t('local_time')}
        </p>
      </div>
    </div>
  );
}
