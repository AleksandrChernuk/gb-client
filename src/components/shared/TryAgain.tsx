'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import errorImg from '@/assets/images/something-happened-on-the-site.avif';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const TryAgain = ({ className }: { className?: string }) => {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  const router = useRouter();

  return (
    <div
      className={cn(
        'tablet:p-6 bg-white dark:bg-slate-700 rounded-2xl flex flex-col items-center self-center gap-4 p-5 mx-auto text-center shadow-xs w-fit',
        className,
      )}
    >
      <div className="relative w-[313px] h-[313px] mx-auto overflow-hidden rounded-3xl">
        <Image src={errorImg} draggable={false} placeholder="blur" alt="peaple wait buses" />
      </div>

      <h3 className="text-2xl font-bold tracking-normal leading-[28.8px] text-slate-700 dark:text-slate-50">
        {t('something_happend')}!
      </h3>

      <Button variant={'default'} size={'primary'} onClick={() => router.refresh()}>
        {t('try_again')}
      </Button>
    </div>
  );
};

export default TryAgain;
