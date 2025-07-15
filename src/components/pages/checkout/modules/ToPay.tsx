import { useSearchStore } from '@/store/useSearch';
import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { memo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { Passenger } from '../types';
import { getTotalPriceFromPassengers } from '../helpers/getTotalPriceFromPassengers';
import { useSelectedTickets } from '@/store/useSelectedTickets';

const ToPay = memo(function ToPay() {
  const adult = useSearchStore((state) => state.adult);
  const children = useSearchStore((state) => state.children);
  const isHydrated = useSelectedTickets((state) => state.isHydrated);
  const t = useTranslations(MESSAGE_FILES.COMMON);
  const { control } = useFormContext();

  const passengers = useWatch({ control, name: 'passengers' }) as Passenger[];
  return (
    <div>
      {isHydrated ? (
        <div className="flex items-start justify-between gap-4">
          <div className="text-xs font-normal tracking-normal leading-[18px] tablet:text-base tablet:leading-6 text-slate-700 dark:text-slate-50">
            <div>{t('to_be_paid')}</div>
            <div>
              {adult && `${t('adult')}: ${adult}`}
              {children >= 1 && `, ${t('children')}: ${children}`}
            </div>
          </div>
          <div className="text-base font-medium leading-4 tracking-normal tablet:text-base tablet:font-bold tablet:leading-6 text-slate-700 dark:text-slate-50">
            {getTotalPriceFromPassengers(passengers)}
            UAH
          </div>
        </div>
      ) : (
        <Skeleton className="w-full h-5" />
      )}
      <div className="w-full h-px my-8 bg-slate-700 dark:bg-slate-50"></div>
      {isHydrated ? (
        <div className="flex items-center justify-between gap-4">
          <div className="text-base font-medium leading-4 tracking-normal text-slate-700 dark:text-slate-50 tablet:text-2xl tablet:leading-[28.8px] laptop:text-2xl laptop:font-bold laptop:leading-[28.8px]">
            {t('total_price')}
          </div>
          <div className="text-base font-medium leading-4 tracking-normal text-slate-700 dark:text-slate-50 tablet:text-2xl tablet:leading-[28.8px] laptop:text-2xl laptop:font-bold laptop:leading-[28.8px]">
            {getTotalPriceFromPassengers(passengers)} UAH
          </div>
        </div>
      ) : (
        <Skeleton className="w-full h-5" />
      )}
    </div>
  );
});

export default ToPay;
