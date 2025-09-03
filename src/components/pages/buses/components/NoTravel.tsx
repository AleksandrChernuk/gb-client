'use client';

import Image from 'next/image';
import noTravelImg from '@/assets/images/an-empty-bus-stop.avif';

import { CustomCard } from '@/components/shared/CustomCard';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/config/message.file.constans';

export const NoTravel = () => {
  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);

  return (
    <CustomCard className="flex flex-col items-center self-center gap-4 p-5 mx-auto text-center shadow-xs w-fit">
      <Image
        src={noTravelImg}
        sizes="100vw"
        draggable={false}
        placeholder="blur"
        alt="peaple wait buses"
        className="mx-auto overflow-hidden rounded-3xl w-[313px] h-auto"
      />
      <h3 className="text-2xl font-bold tracking-normal leading-[28.8px] text-slate-700 dark:text-slate-50 ">
        {t('no_travel')}!
      </h3>
    </CustomCard>
  );
};
