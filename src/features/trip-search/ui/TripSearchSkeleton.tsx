import { Skeleton } from '@/shared/ui/skeleton';

export function TripSearchSkeleton() {
  return (
    <div className="relative flex flex-col overflow-hidden bg-white shadow-xs tablet:flex-row rounded-2xl dark:bg-slate-800">
      <div className="flex flex-col tablet:flex-row tablet:items-center p-4 tablet:px-4 tablet:py-3 tablet:gap-[25px] laptop:gap-10 w-full">
        <Skeleton className="h-10 tablet:h-[55.6px] laptop:h-[58px] w-full bg-green-50 dark:bg-slate-700" />
        <Skeleton className="h-px tablet:hidden my-2 w-full bg-green-50 dark:bg-slate-700" />
        <Skeleton className="h-10 tablet:h-[55.6px] laptop:h-[58px] w-full bg-green-50 dark:bg-slate-700" />
        <Skeleton className="h-px tablet:hidden my-2 w-full bg-green-50 dark:bg-slate-700" />
        <Skeleton className="h-10 tablet:h-[55.6px] laptop:h-[55.6px] w-full bg-green-50 dark:bg-slate-700" />
        <Skeleton className="h-px tablet:hidden my-2 w-full bg-green-50 dark:bg-slate-700" />
        <Skeleton className="h-10 tablet:h-[55.6px] laptop:h-[58px] w-full bg-green-50 dark:bg-slate-700" />
      </div>
      <Skeleton className="tablet:min-w-[120px] laptop:min-w-[187px] laptop:max-w-[187px] min-h-14 tablet:min-h-[90px] laptop:min-h-[87.6px] bg-green-50 dark:bg-slate-700 rounded-none rounded-br-2xl rounded-bl-2xl tablet:rounded-tl-none tablet:rounded-tr-2xl tablet:rounded-bl-none" />
    </div>
  );
}
