'use client';

import { addDays, format, toDate, isBefore, isEqual } from 'date-fns';
import { Button } from '@/components/ui/button';
import useDateLocale from '@/hooks/useDateLocale';
import { Skeleton } from '@/components/ui/skeleton';
import { useSearchStore } from '@/store/useSearch';
import { useDateTabs } from '../hooks/useDateTabs';

export default function DateTabs() {
  const { locale } = useDateLocale();
  const isHydrated = useSearchStore((state) => state.isHydrated);

  const { tabDate, handleUpdateDate, datesArray } = useDateTabs();

  return (
    <div>
      <div className="items-center justify-around gap-4 overflow-x-scroll tablet:gap-8 [&::-webkit-scrollbar]:hidden hidden tablet:flex">
        {datesArray.map((date) => {
          return (
            <div key={format(date, 'dd MMM')}>
              <Button
                disabled={isBefore(addDays(date, 1), new Date())}
                variant={'link'}
                onClick={() => handleUpdateDate(date)}
                aria-label={format(date, 'dd MMM')}
                aria-selected={isEqual(date, toDate(tabDate))}
                className={`${
                  isEqual(date, toDate(tabDate)) && 'bg-slate-50 dark:bg-slate-800'
                } hover:no-underline p-4 laptop:px-6 h-auto w-auto tablet:w-24 laptop:w-32 rounded-none rounded-t-lg text-black  dark:text-slate-50 ${
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
    </div>
  );
}
