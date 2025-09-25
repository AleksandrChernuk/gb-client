'use client';

import { format } from 'date-fns';
import { LuRoute } from 'react-icons/lu';

type Props = {
  fromCityName: string;
  toCityName: string;
  departureDateTime: string;
  arrivalDateTime: string;
  duration?: string | null;
  className?: string;
};

export default function CurrentTripRoute({
  fromCityName,
  toCityName,
  departureDateTime,
  arrivalDateTime,
  duration,
  className,
}: Props) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2 flex-wrap">
        <p className="text-sm tablet:text-xl laptop:text-2xl font-bold tracking-normal tablet:leading-6 text-slate-700 dark:text-slate-50">
          {fromCityName}
        </p>
        <LuRoute aria-hidden className="shrink-0 text-green-300 dark:text-green-100" />
        <p className="text-sm tablet:text-xl laptop:text-2xl font-bold tracking-normal tablet:leading-6 text-slate-700 dark:text-slate-50">
          {toCityName}
        </p>
      </div>

      <div className="mt-1 text-xs text-slate-700 dark:text-slate-200">
        <span className="mr-2">{format(new Date(departureDateTime), 'dd.MM.yyyy HH:mm')}</span>—
        <span className="ml-2">{format(new Date(arrivalDateTime), 'dd.MM.yyyy HH:mm')}</span>
        {duration ? <span className="ml-2 text-slate-400 dark:text-slate-200">· {duration}</span> : null}
      </div>
    </div>
  );
}
