import { useCurrentTicketStore } from '@/store/useCurrentTicket';
import { useSearchStore } from '@/store/useSearch';
import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { countPricing } from '../helpers/countPricing';

export default function ToPay() {
  const adult = useSearchStore((state) => state.adult);
  const children = useSearchStore((state) => state.children);
  const t = useTranslations('common');

  const selectedTicket = useCurrentTicketStore((state) => state.selectedTicket);
  const isHydrated = useCurrentTicketStore((state) => state.isHydrated);

  return (
    <div>
      {isHydrated ? (
        <div className="flex items-start justify-between gap-4">
          <div className="small_text tablet:main_text_body text-text_prymery">
            <div>{t('to_be_paid')}</div>
            <div>
              {adult && `${t('adult')}: ${adult}`}
              {children >= 1 && `, ${t('children')}: ${children}`}
            </div>
          </div>
          <div className="addional_medium_text tablet:h5 text-text_prymery">
            {countPricing({ price: selectedTicket?.ticket_pricing.base_price, passengers: adult + children })} UAH
          </div>
        </div>
      ) : (
        <Skeleton className="w-full h-5" />
      )}
      <div className="w-full h-px my-8 bg-text_prymery"></div>
      {isHydrated ? (
        <div className="flex items-center justify-between gap-4">
          <div className="addional_medium_text text-text_prymery tablet:h4 laptop:h3">{t('total_price')}</div>
          <div className="addional_medium_text text-text_prymery tablet:h4 laptop:h3">
            {countPricing({ price: selectedTicket?.ticket_pricing.base_price, passengers: adult + children })} UAH
          </div>
        </div>
      ) : (
        <Skeleton className="w-full h-5" />
      )}
    </div>
  );
}
