import { useCurrentTicketStore } from '@/store/useCurrentTicket';
import { useSearchStore } from '@/store/useSearch';
import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { countPricing } from './helpers/countPricing';
import { MESSAGE_FILES } from '@/constans/message.file.constans';

export default function ToPay() {
  const adult = useSearchStore((state) => state.adult);
  const children = useSearchStore((state) => state.children);
  const t = useTranslations(MESSAGE_FILES.COMMON);

  const selectedTicket = useCurrentTicketStore((state) => state.selectedTicket);
  const isHydrated = useCurrentTicketStore((state) => state.isHydrated);

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
            {countPricing({ price: selectedTicket?.ticket_pricing.base_price, passengers: adult + children })} UAH
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
            {countPricing({ price: selectedTicket?.ticket_pricing.base_price, passengers: adult + children })} UAH
          </div>
        </div>
      ) : (
        <Skeleton className="w-full h-5" />
      )}
    </div>
  );
}
