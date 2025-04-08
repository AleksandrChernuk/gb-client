import React from 'react';
import { Skeleton } from '../ui/skeleton';

export default function FieldSkeleton() {
  return <Skeleton className="h-[42px] tablet:h-[58px] laptop:h-[55.6px] w-full bg-green-50 dark:bg-slate-700" />;
}
