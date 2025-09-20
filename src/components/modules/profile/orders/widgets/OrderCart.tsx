'use client';

import { UserOrdersType } from '@/types/payments.Info.types';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

import CarrierLabel from '@/components/modules/ticket-card/components/CarrierLabel';
import { useQuery } from '@tanstack/react-query';
import { getOrderStatusAndPdf } from '@/actions/orders.actions';
import MainLoader from '@/components/shared/MainLoader';
import LoadingPdfBtn from '@/components/shared/LoadingPdfBtn';
import TicketLinkBtn from '@/components/shared/TicketLinkBtn';
import OrderDetails from './OrderDetails';
import { MetaField } from '../../common/components/MetaField';
import { TRANSLATION_KEYS } from '@/i18n/translationKeys';
import { formatMoney, formatOrderNumber, parseErrorKey } from '../../common/helpers';
import { S } from '../../common/styles/style';
import { OrderRoute } from '../ui/OrderRoute';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

type Props = {
  item: UserOrdersType;
};

const OrderCart = ({ item }: Props) => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<null | string>(null);

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ['order-status-and-pdf', orderId],
    queryFn: async () => getOrderStatusAndPdf(orderId || ''),
    enabled: !!orderId && isOpen,
  });

  const sectionId = `order-details-${item.orderId}`;

  return (
    <div className={S.card}>
      <div className="flex items-start justify-between">
        <MetaField
          value={formatOrderNumber(item.orderNumber)}
          classNamesValue="text-lg laptop:text-xl font-semibold text-slate-900 dark:text-white"
        />
        <div>
          <p className={cn(S.value, 'flex items-center gap-1')}>
            {format(item.updatedAt, 'dd.MM.yyyy')}
            <span className="text-xs p-1 border border-green-300 dark:border-green-100 rounded-xl text-green-300 dark:text-green-100">
              {format(item.updatedAt, 'HH:mm')}
            </span>
          </p>
        </div>
      </div>

      <div className={S.divider} />

      <div className="flex items-center gap-2 justify-between">
        <OrderRoute fromCityName={item.fromCityName} toCityName={item.toCityName} />

        <MetaField
          label={TRANSLATION_KEYS.profile.total_amount}
          classNamesValue="text-xl tablet:text-2xl font-medium tracking-normal"
          value={formatMoney(item.totalPrice, item.currency)}
        />
      </div>

      <div className={S.divider} />

      <div className="flex items-center gap-2 justify-between">
        <CarrierLabel carrierName={item.carrierName || 'Deafault'} />

        <Button
          variant="link"
          className={S.detailsBtn}
          aria-expanded={isOpen}
          aria-controls={sectionId}
          disabled={isFetching}
          onClick={() => {
            setIsOpen((p) => !p);
            setOrderId(item.orderId);
          }}
        >
          <span>{!isOpen ? t(TRANSLATION_KEYS.common.details) : t(TRANSLATION_KEYS.common.collapse_details)}</span>
          <ChevronDown size={16} className={`${S.chevron} ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
        </Button>
      </div>

      <div id={sectionId} className={`${S.collapse} ${isOpen ? S.collapseOpen : S.collapseClosed}`}>
        {isOpen && (
          <div className="mt-4">
            <OrderDetails
              item={item}
              orderStatus={data?.message}
              tickets={
                <>
                  {(isError || error) && <div className="text-red-500 text-sm">{t(parseErrorKey(error.message))}</div>}

                  {(isFetching || isLoading) && <MainLoader />}

                  {!isFetching && !isLoading && data?.pdf && (
                    <div>
                      <LoadingPdfBtn pdf={data.pdf} orderNumber={item.orderNumber.padStart(9, '0')} />
                    </div>
                  )}

                  {!isFetching && !isLoading && data?.ticketLinks && (
                    <div className="space-y-2">
                      {data.ticketLinks.map((e) => (
                        <div key={e}>
                          <TicketLinkBtn href={e} />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCart;
