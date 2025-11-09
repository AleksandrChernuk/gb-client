import { useTranslations } from 'next-intl';
import { memo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useSelectedTickets } from '@/shared/store/useSelectedTickets';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Skeleton } from '@/shared/ui/skeleton';
import { useShallow } from 'zustand/react/shallow';
import { TimerDisplay } from '@/widgets/checkout/ui/TimerDisplay';
import { getTotalPriceFromPassengers } from '@/features/checkout-form';
import { PassengerFormData } from '@/features/checkout-form/types/passenger.form.types';

const ToPay = memo(function ToPay() {
  const t = useTranslations(MESSAGE_FILES.COMMON);
  const t_CHECKOUT = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);

  const { selectedTicket, isHydrated } = useSelectedTickets(
    useShallow((state) => ({
      selectedTicket: state.selectedTicket,
      isHydrated: state.isHydrated,
    })),
  );

  const { control } = useFormContext();

  const voyagers = selectedTicket?.voyagers ?? 0;

  const passengers = useWatch({ control, name: 'passengers' }) as PassengerFormData[];

  return (
    <ul>
      {isHydrated ? (
        <ul className="space-y-2">
          <ul className="flex items-center justify-between flex-wrap gap-4">
            <li>
              <p className="text-base font-medium leading-4 tracking-normal text-slate-700 dark:text-slate-50 tablet:text-2xl tablet:leading-[28.8px] laptop:text-2xl laptop:font-bold laptop:leading-[28.8px]">
                {t('total_price')}
              </p>
            </li>
            <li>
              <p className="text-lg font-medium leading-4 tracking-normal text-slate-700 dark:text-slate-50 tablet:text-2xl tablet:leading-[28.8px] laptop:text-2xl laptop:font-bold laptop:leading-[28.8px]">
                {getTotalPriceFromPassengers(passengers)} UAH
              </p>
            </li>
          </ul>

          <li>
            <p className="text-xs text-green-300 dark:text-green-100">{t_CHECKOUT('price_note')}</p>
          </li>
          <li className="w-full h-px bg-slate-700 dark:bg-slate-50" />
          <li>
            <TimerDisplay />
          </li>
        </ul>
      ) : (
        <Skeleton className="w-full h-5" />
      )}
      <li className="w-full h-px my-4 bg-slate-700 dark:bg-slate-50" />
      {isHydrated ? (
        <li className="flex items-start justify-between gap-4">
          <ul className="flex items-center gap-1">
            <li>
              <p className="text-base font-normal tracking-normal leading-[18px] tablet:text-lg tablet:leading-6 text-slate-700 dark:text-slate-50">
                {voyagers && `${t('placeholderPassengers')}: `}
                {voyagers}
              </p>
            </li>
          </ul>
        </li>
      ) : (
        <Skeleton className="w-full h-5" />
      )}
    </ul>
  );
});

export default ToPay;
