'use client';

import Image from 'next/image';
import noTravelImg from '@/public/images/an-empty-bus-stop.avif';

import { CustomCard } from '@/components/shared/CustomCard';
import { useTranslations } from 'next-intl';

export const NoTravel = () => {
  const t = useTranslations('common');

  return (
    <CustomCard className="mx-auto flex flex-col items-center self-center gap-8 p-5 text-center w-fit shadow-xs">
      <Image
        src={noTravelImg}
        width={313}
        height={313}
        sizes="100vw"
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
