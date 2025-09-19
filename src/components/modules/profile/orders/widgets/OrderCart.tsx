'use client';

import { UserOrdersType } from '@/types/payments.Info.types';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarArrowDown, ChevronDown } from 'lucide-react';
import { LuRoute } from 'react-icons/lu';
import { format } from 'date-fns';
import CarrierLabel from '@/components/modules/ticket-card/components/CarrierLabel';
import { useQuery } from '@tanstack/react-query';
import { getOrderStatusAndPdf } from '@/actions/orders.actions';
import MainLoader from '@/components/shared/MainLoader';
import LoadingPdfBtn from '@/components/shared/LoadingPdfBtn';
import TicketLinkBtn from '@/components/shared/TicketLinkBtn';
import OrderDetails from './OrderDetails';

const CLS = {
  card: 'border border-slate-50 dark:border-slate-700 p-4 tablet:p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xs',
  textBase: 'text-slate-700 dark:text-slate-50',
  textMuted: 'text-slate-400 dark:text-slate-200',

  cityTitleMobile: 'text-sm tablet:text-xl laptop:text-2xl font-bold tracking-normal tablet:leading-6',
  stationTextMobile: 'text-xs tablet:text-sm font-normal tracking-normal leading-[18px] tablet:leading-4',
  stationTextDesktop: 'text-xs tablet:text-sm font-normal tracking-normal leading-[18px] tablet:leading-4',

  price: 'text-xl tablet:text-2xl font-medium tracking-normal',
  currency: 'text-xs ml-[2px]',

  routeTime: 'text-xs font-normal tracking-normal leading-[18px] text-slate-700 dark:text-slate-200',

  carrierWrap: 'flex items-center gap-1',
  carrierName: 'block text-[10px] tablet:text-xs font-normal tracking-normal leading-[18px] break-all',

  detailsBtn:
    'flex items-center self-end gap-px p-2 text-green-300 dark:text-green-100 underline cursor-pointer text-[12px] font-bold tracking-normal leading-[18px] text-nowrap transition-all duration-200',

  // плавное сворачивание контента
  collapse: 'overflow-hidden transition-all duration-300 ease-in-out',
  collapseOpen: 'max-h-[4000px] opacity-100',
  collapseClosed: 'max-h-0 opacity-0',

  ticketsTitle: 'mb-4 text-base tablet:text-lg font-medium tracking-normal leading-[18px] break-all',
};

type Props = {
  item: UserOrdersType;
};

const parseErrorKey = (msg: string) => {
  switch (msg) {
    case 'Payment is pending':
      return 'payment_pending';
    default:
      return 'error_occurred';
  }
};

const OrderCart = ({ item }: Props) => {
  const t = useTranslations(MESSAGE_FILES.COMMON);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<null | string>(null);

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ['order-status-and-pdf', orderId],
    queryFn: async () => getOrderStatusAndPdf(orderId || ''),
    enabled: !!orderId && isOpen,
  });

  const sectionId = `order-details-${item.orderId}`;

  return (
    <div className={CLS.card}>
      {/* верхняя строка: номер + дата */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="text-green-300 dark:text-green-100 text-base tablet:text-xl">
          № {item.orderNumber.padStart(9, '0')}
        </div>
        <div className="flex items-center gap-2">
          <CalendarArrowDown className="size-5 stroke-current text-green-300 dark:text-green-100" />
          <div className={CLS.textBase}>{format(item.departureDateTime || new Date(), 'dd.MM.yy')}</div>
        </div>
      </div>

      {/* разделитель */}
      <div className="border-t border-[#e6e6e6] dark:border-slate-700 my-4" />

      {/* маршрут + цена */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <p className={`${CLS.cityTitleMobile} ${CLS.textBase}`}>{item.fromCityName}</p>
          <LuRoute aria-hidden className="shrink-0 text-green-300 dark:text-green-100" />
          <p className={`${CLS.cityTitleMobile} ${CLS.textBase}`}>{item.toCityName}</p>
        </div>

        <div className={`${CLS.price} ${CLS.textBase}`}>
          {Math.floor(Number(item.totalPrice || 0))}
          <span className={CLS.currency}>{item.currency}</span>
        </div>
      </div>

      <div className="border-t border-[#e6e6e6] dark:border-slate-700 my-4" />

      <div className="flex items-center justify-between gap-2">
        <CarrierLabel carrierName={item.carrierName || 'Deafault'} />

        <Button
          variant="link"
          className={CLS.detailsBtn}
          aria-expanded={isOpen}
          aria-controls={sectionId}
          disabled={isFetching}
          onClick={() => {
            setIsOpen((p) => !p);
            setOrderId(item.orderId);
          }}
        >
          <span>{!isOpen ? t('details') : t('collapse_details')}</span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 dark:stroke-green-100 stroke-green-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          />
        </Button>
      </div>

      <div id={sectionId} className={`${CLS.collapse} ${isOpen ? CLS.collapseOpen : CLS.collapseClosed}`}>
        {isOpen && (
          <div className="mt-4">
            <OrderDetails
              item={item}
              orderStatus={data?.message}
              tickets={
                <>
                  {(isError || error) && <div className="text-red-500 text-sm">{t(parseErrorKey(error.message))}</div>}

                  {(isFetching || isLoading) && <MainLoader />}

                  {data?.pdf && (
                    <div>
                      <LoadingPdfBtn pdf={data.pdf} orderNumber={item.orderNumber.padStart(9, '0')} />
                    </div>
                  )}

                  {data?.ticketLinks && (
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
