'use client';

import { useCurrentRouteStore } from '@/store/useCurrentRoute';
import { useState } from 'react';
import DetailsOpenButton from '../../DetailsOpenButton';
import DetailsStopsPreview from './DetailsStopsPreview';
 import DetailsStopsList from './DetailsStopsList';
import { useTranslation } from 'react-i18next';

export default function DetailsStops() {
  const [open, setOpen] = useState<boolean>(false);
  const сurrentRoute = useCurrentRouteStore((state) => state.сurrentRoute);
  const { t } = useTranslation(['common']);

  return (
    <div className='space-y-2'>
      {!open && (
        <div className={`relative flex flex-col items-start gap-2 overflow-visible`}>
          <span className='absolute left-0 top-0 h-full w-[2px] border-r-[2px] border-gray_2_for_body dark:border-blackmode border-dashed translate-x-[56.5px] '></span>
          <DetailsStopsPreview />
        </div>
      )}

      {open && (
        <div className={`relative flex flex-col items-start gap-2 mt-4`}>
          <span className='absolute z-0 left-0 top-0 h-full w-[2px] border-r-[2px] border-gray_2_for_body dark:border-blackmode border-dashed translate-x-[56.5px]'></span>
          <DetailsStopsList />
        </div>
      )}

      {сurrentRoute?.details?.stops && (
        <DetailsOpenButton
          isOpen={open}
          onClick={() => setOpen((p) => !p)}
        >{`${open ? t('collapse_route') : t('show_route')}`}</DetailsOpenButton>
      )}
    </div>
  );
}
