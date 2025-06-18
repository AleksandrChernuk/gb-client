'use client';

import { IconPath } from '@/assets/icons/icon-path';
import { IconRouteArrow } from '@/components/icons/IconRouteArrow';
import { Link } from '@/i18n/routing';
import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { useSearchStore } from '@/store/useSearch';
import { ILocation } from '@/types/location.types';
import { format } from 'date-fns';
import { useLocale } from 'next-intl';

type TIRoutersItem = {
  from: ILocation;
  to: ILocation;
};

export default function RoutersItem({ from, to }: TIRoutersItem) {
  const locale = useLocale();
  const setCity = useSearchStore((state) => state.setCity);
  const setDate = useSearchStore((state) => state.setDate);

  const formatted = format(new Date() || new Date(), 'yyyy-MM-dd');

  const handleSetCity = () => {
    setCity('to', to);
    setCity('from', from);
    setDate(formatted);
  };

  return (
    <Link
      prefetch={false}
      href={{
        pathname: '/buses',
        query: { from: from.id, to: to.id, date: formatted },
      }}
      onClick={handleSetCity}
      className="block h-auto bg-white hover:bg-slate-50 focus:bg-slate-50 border-[1px] 
      border-transparent focus:border-black dark:bg-slate-900 dark:hover:bg-black 
      dark:focus:bg-slate-700 dark:focus:border-slate-200 px-4 py-3 tablet:py-[18px] laptop:p-6 rounded-lg laptop:rounded-2xl transition-colors duration-300"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-1 tablet:gap-2">
          <div className="text-sm font-normal tracking-normal leading-[21px] tablet:text-base tablet:leading-6 aptop:leading-6 text-slate-700 dark:text-slate-50">
            {extractLocationDetails(from, locale).locationName}
          </div>

          <div className="w-[62px] h-[20px] inline-flex items-center">
            <IconPath />
          </div>
          <div className="text-sm font-normal tracking-normal leading-[21px] tablet:text-base tablet:leading-6 laptop:leading-6 text-slate-700 dark:text-slate-50">
            {extractLocationDetails(to, locale).locationName}
          </div>
        </div>
        <div className="w-6 h-6">
          <IconRouteArrow />
        </div>
      </div>
    </Link>
  );
}
