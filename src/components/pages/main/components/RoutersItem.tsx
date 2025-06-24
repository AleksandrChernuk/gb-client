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
      scroll={true}
      onClick={handleSetCity}
      className="truncate block h-auto bg-white hover:bg-slate-50 focus:bg-slate-50 border-[1px] 
      border-transparent focus:border-black dark:bg-slate-900 dark:hover:bg-black 
      dark:focus:bg-slate-700 dark:focus:border-slate-200 px-3 py-2 tablet:py-[18px] laptop:p-5 rounded-lg laptop:rounded-2xl transition-colors duration-300"
    >
      <div className="grid grid-cols-7">
        <div className="flex items-center gap-1 tablet:gap-2 flex-1 col-span-6">
          <p className="truncate text-sm font-normal tracking-normal leading-[21px] tablet:text-base tablet:leading-6 aptop:leading-6 text-slate-700 dark:text-slate-50  ">
            {extractLocationDetails(from, locale).locationName}
          </p>

          <div className="w-[62px] h-[20px] flex items-center ">
            <IconPath />
          </div>

          <p className="truncate text-sm font-normal tracking-normal leading-[21px] tablet:text-base tablet:leading-6 laptop:leading-6 text-slate-700 dark:text-slate-50  ">
            {extractLocationDetails(to, locale).locationName}
          </p>
        </div>
        <div
          className="size-6 [&_svg]:shrink-0 justify-self-end

"
        >
          <IconRouteArrow />
        </div>
      </div>
    </Link>
  );
}
