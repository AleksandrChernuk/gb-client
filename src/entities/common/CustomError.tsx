'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import errorImg from '@/assets/images/something-happened-on-the-site.avif';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { useRouter } from '@/shared/i18n/routing';
import CustomCard from '@/shared/ui/CustomCard';
import { Button } from '@/shared/ui/button';

export const CustomError = () => {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  const router = useRouter();

  return (
    <CustomCard className="flex flex-col items-center self-center gap-4 p-5 mx-auto text-center shadow-xs w-fit">
      <div className="relative w-[313px] h-[313px] mx-auto overflow-hidden rounded-3xl">
        <Image src={errorImg} draggable={false} placeholder="blur" alt="peaple wait buses" />
      </div>

      <h3 className="text-2xl font-bold tracking-normal leading-[28.8px] text-slate-700 dark:text-slate-50">
        {t('something_happend')}!
      </h3>

      <Button variant={'default'} size={'primary'} onClick={() => router.refresh()}>
        {t('try_again')}
      </Button>
    </CustomCard>
  );
};
