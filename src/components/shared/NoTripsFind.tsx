'use client';

import Image from 'next/image';
import noTravelImg from '@/assets/images/an-empty-bus-stop.avif';

import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  text: string;
};

const NoTripsFind = ({ className, text }: Props) => {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  return (
    <div
      className={cn(
        'flex flex-col items-center self-center gap-4 p-5 mx-auto text-center w-fit tablet:p-6 bg-white dark:bg-slate-900 shadow-xs rounded-2xl',
        className,
      )}
    >
      <Image
        src={noTravelImg}
        sizes="100vw"
        draggable={false}
        placeholder="blur"
        alt="peaple wait buses"
        className="mx-auto overflow-hidden rounded-3xl w-[313px] h-auto"
      />
      <h3 className="text-2xl font-bold tracking-normal leading-[28.8px] text-slate-700 dark:text-slate-50 ">
        {t(text)}!
      </h3>
    </div>
  );
};
export default NoTripsFind;
