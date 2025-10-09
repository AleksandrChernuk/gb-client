import { Skeleton } from '@/shared/ui/skeleton';

export default function SkeletonRote() {
  const arr = Array.from({ length: 6 });
  return (
    <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 mb-4 laptop:grid-cols-2 laptop:gap-8 laptop:mb-8">
      {arr.map((_, i) => (
        <Skeleton className="h-[50px] tablet:h-[62px] laptop:h-[74px] w-full bg-green-50 dark:bg-slate-700" key={i} />
      ))}
    </div>
  );
}
