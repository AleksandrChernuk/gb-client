'use client';
import arrow from '@/assets/icons/arrow-mobile.svg';
import { useTranslations } from 'next-intl';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import Image from 'next/image';
import { IconRouteLeft } from '@/assets/icons/IconRouteLeft';
import { IconRouteRigth } from '@/assets/icons/IconRouteRigth'; // проверь название

type Props = {
  duration: string; // ожидаем формат "HH:MM"
  location_from: string;
  location_from_name: string;
  location_from_address: string;
  date_time_from: string; // "HH:mm"
  location_to: string;
  location_to_name: string;
  location_to_address: string; // <-- Переименовал для ясности
  date_time_to: string; // "HH:mm"
};

export default function TicketRoute({
  duration,
  location_from,
  location_from_name,
  location_from_address,
  date_time_from,
  location_to,
  location_to_name,
  location_to_address,
  date_time_to,
}: Props) {
  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const [h, m] = (duration ?? '').split(':'); // безопасный сплит

  return (
    <>
      {isMobile ? (
        <div className="flex gap-2">
          <div className="flex flex-col justify-between text-slate-700 dark:text-slate-50">
            <div className="text-sm font-bold tracking-normal leading-[16.8px]">{date_time_from}</div>
            <div className="text-xs font-normal tracking-normal leading-[18px] text-slate-400 dark:text-slate-200">
              {duration}
            </div>
            <div className="text-sm font-bold tracking-normal leading-[16.8px]">{date_time_to}</div>
          </div>

          <div className="w-[26px] h-[80px] shrink-0" aria-hidden>
            <Image src={arrow} alt="" className="size-full" unoptimized />
          </div>

          <div className="flex flex-col justify-between gap-4">
            <div className="space-y-0.5">
              <div className="flex items-center text-slate-700 dark:text-slate-50 text-sm font-bold tracking-normal leading-[16.8px] tablet:text-base tablet:leading-6">
                {location_from}
              </div>
              <div className="text-xs tracking-normal leading-[18px] text-slate-700 dark:text-slate-200 tablet:text-sm font-normal tablet:leading-4">
                {location_from_name}
                {location_from_address ? `, ${location_from_address}` : ''}
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center text-slate-700 dark:text-slate-50 text-sm font-bold tracking-normal leading-[16.8px] tablet:text-base tablet:leading-6">
                {location_to}
              </div>
              <div className="text-xs leading-[18px] text-slate-700 dark:text-slate-200 tablet:text-sm font-normal tablet:leading-4 tracking-normal">
                {location_to_name}
                {location_to_address ? `, ${location_to_address}` : ''}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid justify-between w-full grid-cols-3 gap-2">
          <div className="flex flex-col gap-1">
            <div className="text-2xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
              {date_time_from}
            </div>
            <div className="text-base font-bold leading-6 tracking-normal laptop:text-2xl laptop:font-medium laptop:leading-[28.8px] text-slate-700 dark:text-slate-50">
              {location_from}
            </div>
            <div className="text-sm font-normal leading-4 tracking-normal text-slate-400 dark:text-slate-200 break-words">
              {location_from_name}
              {location_from_address ? `, ${location_from_address}` : ''}
            </div>
          </div>

          <div className="flex items-center justify-center gap-1">
            <div className="w-[50px] h-[17px]" aria-hidden>
              <IconRouteLeft />
            </div>
            <div className="text-xs font-normal tracking-normal leading-[18px] text-slate-700 dark:text-slate-200">
              {h && m ? `${h}${t('shortHours')}:${m}${t('shortMinutes')}` : ''}
            </div>
            <div className="w-[50px] h-[17px]" aria-hidden>
              <IconRouteRigth />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-2xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
              {date_time_to}
            </div>
            <div className="text-base font-bold leading-6 tracking-normal laptop:text-2xl laptop:font-medium laptop:leading-[28.8px] text-slate-700 dark:text-slate-50">
              {location_to}
            </div>
            <div className="text-sm font-normal leading-4 tracking-normal text-slate-400 dark:text-slate-200 break-words">
              {location_to_name}
              {location_to_address ? `, ${location_to_address}` : ''}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
