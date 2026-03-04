'use client';

import { IconPath } from '@/assets/icons/icon-path';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Link } from '@/shared/i18n/routing';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import { ILocation } from '@/shared/types/location.types';
import { format } from 'date-fns';
import { ChevronRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

type TIRoutersItem = {
  from: ILocation;
  to: ILocation;
};

export default function RoutersItem({ from, to }: TIRoutersItem) {
  const locale = useLocale();
  const t = useTranslations(MESSAGE_FILES.MAIN_PAGE);

  const formatted = format(new Date(), 'yyyy-MM-dd');

  return (
    <Link
      prefetch={false}
      href={{
        pathname: '/buses',
        query: { from: from.id, to: to.id, date: formatted, voyagers: 1 },
      }}
      scroll={true}
      title={t('router_link_title', {
        from: extractLocationDetails(from, locale).locationName,
        to: extractLocationDetails(to, locale).locationName,
      })}
      className="truncate block h-auto bg-white hover:bg-slate-50 focus:bg-slate-50 border-[1px] 
      border-transparent focus:border-black dark:bg-slate-900 dark:hover:bg-black 
      dark:focus:bg-slate-700 dark:focus:border-slate-200 px-3 py-2 tablet:py-[18px] laptop:p-5 rounded-lg laptop:rounded-2xl transition-colors duration-300"
    >
      <div className="grid grid-cols-[1fr_24px] gap-2">
        <div className="flex items-center gap-1 tablet:gap-2 overflow-hidden">
          <p className="truncate text-base font-normal tracking-normal leading-[21px] tablet:text-lg tablet:leading-6 aptop:leading-6 text-slate-700 dark:text-slate-50  ">
            {extractLocationDetails(from, locale).locationName}
          </p>

          <div className="w-[62px] h-[20px] flex items-center ">
            <IconPath />
          </div>

          <p className="truncate text-base font-normal tracking-normal leading-[21px] tablet:text-lg tablet:leading-6 laptop:leading-6 text-slate-700 dark:text-slate-50  ">
            {extractLocationDetails(to, locale).locationName}
          </p>
        </div>
        <div className=" justify-self-end">
          <ChevronRight className=" dark:stroke-slate-50" />
        </div>
      </div>
      <span className="sr-only">
        {t('router_sr_only', {
          from: extractLocationDetails(from, locale).locationName,
          to: extractLocationDetails(to, locale).locationName,
        })}
      </span>
    </Link>
  );
}
