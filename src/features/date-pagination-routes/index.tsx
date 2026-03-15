// 'use client';

// import { useDateTabs } from '@/features/date-pagination-routes/hooks/useDateTabs';
// import useDateLocale from '@/shared/hooks/useDateLocale';
// import { useIsHydration } from '@/shared/hooks/useIsHydration';
// import { Button } from '@/shared/ui/button';
// import { Skeleton } from '@/shared/ui/skeleton';
// import { addDays, format, toDate, isBefore, isEqual } from 'date-fns';

// export default function DateTabs() {
//   const { locale } = useDateLocale();

//   const { tabDate, handleUpdateDate, datesArray } = useDateTabs();

//   const { hydrated } = useIsHydration();

//   return (
//     <div className="items-center justify-around gap-4 overflow-x-scroll tablet:gap-8 [&::-webkit-scrollbar]:hidden hidden tablet:flex">
//       {datesArray.map((date) => {
//         return (
//           <div key={date.toISOString()}>
//             <Button
//               disabled={isBefore(addDays(date, 1), new Date())}
//               variant={'link'}
//               onClick={() => handleUpdateDate(date)}
//               aria-label={format(date, 'dd MMM')}
//               aria-selected={isEqual(date, toDate(tabDate))}
//               aria-disabled={isBefore(addDays(date, 1), new Date())}
//               className={`${
//                 isEqual(date, toDate(tabDate)) &&
//                 'bg-slate-50 dark:bg-slate-800 aria-disabled:bg-slate-50 aria-disabled:opacity-100 aria-disabled:pointer-events-none '
//               } hover:no-underline p-4 laptop:px-6 h-auto w-auto tablet:w-24 laptop:w-32 rounded-none rounded-t-lg text-black dark:text-slate-50 transition-none ${
//                 !isEqual(date, toDate(tabDate)) && 'text-white'
//               }`}
//             >
//               <ul className="flex flex-col items-center gap-1">
//                 <li className="text-xs font-normal tracking-normal leading-[18px] tablet:text-base tablet:leading-6 first-letter:uppercase">
//                   {hydrated ? (
//                     format(date, 'EEE', { locale })
//                   ) : (
//                     <Skeleton className="w-[29px] h-[20px] bg-green-50 dark:bg-slate-700" />
//                   )}
//                 </li>
//                 <li className="text-xs font-bold tracking-normal leading-[18px] tablet:text-base tablet:leading-6">
//                   {hydrated ? (
//                     format(date, 'dd MMM', { locale })
//                   ) : (
//                     <Skeleton className="w-[55px] h-[20px] bg-green-50 dark:bg-slate-700" />
//                   )}
//                 </li>
//               </ul>
//             </Button>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
'use client';

import { useDateTabs } from '@/features/date-pagination-routes/models/useDateTabs';
import useDateLocale from '@/shared/hooks/useDateLocale';
import { useIsHydration } from '@/shared/hooks/useIsHydration';
import { Skeleton } from '@/shared/ui/skeleton';
import { cn } from '@/shared/lib/utils';
import { format, isBefore, isEqual, startOfDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function DateTabs() {
  const { locale } = useDateLocale();
  const { tabDate, handleUpdateDate, handleNavigate, datesArray } = useDateTabs();
  const { hydrated } = useIsHydration();

  const today = startOfDay(new Date());
  const isPast = (date: Date) => isBefore(date, today);
  const isActive = (date: Date) => isEqual(startOfDay(date), tabDate);

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => handleNavigate(-1)}
        disabled={isPast(datesArray[0])}
        className="p-2 text-white disabled:opacity-30 shrink-0"
        aria-label="Previous day"
      >
        <ChevronLeft className="size-5" />
      </button>

      <div className="flex items-center justify-around flex-1">
        {datesArray.map((date) => (
          <button
            key={date.toISOString()}
            disabled={isPast(date)}
            onClick={() => handleUpdateDate(date)}
            className={cn(
              'flex flex-col items-center gap-1 px-4 py-3 tablet:px-6 tablet:py-4 rounded-t-lg min-w-[72px] tablet:min-w-0 ',
              'disabled:opacity-30 disabled:pointer-events-none',
              isActive(date)
                ? 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-50 cursor-pointe cursor-pointer'
                : 'text-white cursor-pointer',
            )}
          >
            {hydrated ? (
              <>
                <span className="text-xs tablet:text-sm laptop:text-base font-normal first-letter:uppercase">
                  {format(date, 'EEE', { locale })}
                </span>
                <span className="text-xs tablet:text-sm laptop:text-base font-bold">
                  {format(date, 'd MMM', { locale })}
                </span>
              </>
            ) : (
              <Skeleton className="w-12 h-10 bg-green-50 dark:bg-slate-700" />
            )}
          </button>
        ))}
      </div>

      <button onClick={() => handleNavigate(1)} className="p-2 text-white shrink-0" aria-label="Next day">
        <ChevronRight className="size-5 cursor-pointer" />
      </button>
    </div>
  );
}
