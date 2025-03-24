'use client';

import Image from 'next/image';
import noTravelImg from '@/public/images/an-empty-bus-stop.avif';

import { CustomCard } from '@/components/shared/CustomCard';
import { useTranslations } from 'next-intl';

export const NoTravel = () => {
  const t = useTranslations('common');

  return (
    <CustomCard className="mx-auto flex flex-col items-center self-center gap-8 p-5 text-center w-fit shadow-[0_4px_10px_0_rgba(0,0,0,0.2)]">
      <Image
        src={noTravelImg}
        width={313}
        height={313}
        sizes="100vw"
        placeholder="blur"
        alt="peaple wait buses"
        className="overflow-hidden rounded-3xl mx-auto"
      />
      <h3 className="h3 text-text_prymery ">{t('no_travel_dates')}!</h3>
    </CustomCard>
  );
};
