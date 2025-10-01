'use client';

import { useDateTabs } from '@/features/date-pagination-routes/hooks/useDateTabs';
import useDateLocale from '@/shared/hooks/useDateLocale';
import { useSearchStore } from '@/shared/store/useSearch';
import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';
import { addDays, format, toDate, isBefore, isEqual } from 'date-fns';

export default function DateTabs() {
  const { locale } = useDateLocale();
  const isHydrated = useSearchStore((state) => state.isHydrated);

  const { tabDate, handleUpdateDate, datesArray, enabled } = useDateTabs();

  return (
    <div className="items-center justify-around gap-4 overflow-x-scroll tablet:gap-8 [&::-webkit-scrollbar]:hidden hidden tablet:flex">
      {datesArray.map((date) => {
        return (
          <div key={date.toISOString()}>
            <Button
              disabled={isBefore(addDays(date, 1), new Date()) || !enabled}
              variant={'link'}
              onClick={() => handleUpdateDate(date)}
              aria-label={format(date, 'dd MMM')}
              aria-selected={isEqual(date, toDate(tabDate))}
              aria-disabled={isBefore(addDays(date, 1), new Date()) || !enabled}
              className={`${
                isEqual(date, toDate(tabDate)) &&
                'bg-slate-50 dark:bg-slate-800 aria-disabled:bg-slate-50 aria-disabled:opacity-100 aria-disabled:pointer-events-none'
              } hover:no-underline p-4 laptop:px-6 h-auto w-auto tablet:w-24 laptop:w-32 rounded-none rounded-t-lg text-black dark:text-slate-50  ${
                !isEqual(date, toDate(tabDate)) && 'text-white'
              }`}
            >
              <ul className="flex flex-col items-center gap-1">
                <li className="text-xs font-normal tracking-normal leading-[18px] tablet:text-base tablet:leading-6 first-letter:uppercase">
                  {isHydrated ? (
                    format(date, 'EEE', { locale })
                  ) : (
                    <Skeleton className="w-[29px] h-[20px] bg-green-50 dark:bg-slate-700" />
                  )}
                </li>
                <li className="text-xs font-bold tracking-normal leading-[18px] tablet:text-base tablet:leading-6">
                  {isHydrated ? (
                    format(date, 'dd MMM', { locale })
                  ) : (
                    <Skeleton className="w-[55px] h-[20px] bg-green-50 dark:bg-slate-700" />
                  )}
                </li>
              </ul>
            </Button>
          </div>
        );
      })}
    </div>
  );
}
