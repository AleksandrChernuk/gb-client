'use client';

import { CustomCard } from '@/components/shared/CustomCard';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import errorImg from '@/public/images/something-happened-on-the-site.avif';

export const ErrorTravel = () => {
  const t = useTranslations('common');

  return (
    <CustomCard className="mx-auto flex flex-col items-center self-center gap-8 p-5 text-center w-fit shadow-[0_4px_10px_0_rgba(0,0,0,0.2)]">
      <Image
        src={errorImg}
        width={313}
        height={313}
        sizes="100vw"
        placeholder="blur"
        alt="peaple wait buses"
        className="mx-auto overflow-hidden rounded-3xl"
      />
      <h3 className="text-2xl font-bold tracking-normal leading-[28.8px] text-slate-700 dark:text-slate-50">
        {t('something_happend')}!
      </h3>
    </CustomCard>
  );
};
