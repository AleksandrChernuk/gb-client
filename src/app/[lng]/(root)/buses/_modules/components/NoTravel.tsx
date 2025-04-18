'use client';

import Image from 'next/image';
import noTravelImg from '@/assets/images/an-empty-bus-stop.avif';

import { CustomCard } from '@/components/shared/CustomCard';
import { useTranslations } from 'next-intl';

export const NoTravel = () => {
  const t = useTranslations('common');

  return (
    <CustomCard className="flex flex-col items-center self-center gap-8 p-5 mx-auto text-center shadow-xs w-fit">
      <Image
        src={noTravelImg}
        width={313}
        height={313}
        sizes="100vw"
        draggable={false}
        placeholder="blur"
        alt="peaple wait buses"
        className="mx-auto overflow-hidden rounded-3xl"
      />
      <h3 className="text-2xl font-bold tracking-normal leading-[28.8px] text-slate-700 dark:text-slate-50 ">
        {t('no_travel_dates')}!
      </h3>
    </CustomCard>
  );
};
