'use client';

import { UserOrdersType } from '@/types/payments.Info.types';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarArrowDown } from 'lucide-react';
import { LuRoute } from 'react-icons/lu';
import { format } from 'date-fns';
import CarrierLabel from '@/components/modules/ticket-card/components/CarrierLabel';
import { useQuery } from '@tanstack/react-query';
import { getOrderStatusAndPdf } from '@/actions/orders.actions';
import { MainLoader } from '@/components/shared/MainLoader';
import LoadingPdfBtn from '@/components/shared/LoadingPdfBtn';
import TicketLinkBtn from '@/components/shared/TicketLinkBtn';
import OrderDetails from './OrderDetails';

const CLS = {
  card: 'border border-slate-50 dark:border-slate-700 p-4 bg-white shadow-xs tablet:p-4 dark:bg-slate-800 rounded-2xl',
  textBase: 'text-slate-700 dark:text-slate-50',
  textMuted: 'text-slate-400 dark:text-slate-200',

  badgeRight: 'text:xs tablet:text-base font-bold text-green-300 text-right mb-4',
  cityTitleMobile: 'text-sm font-bold tracking-normal tablet:text-xl laptop:text-2xl tablet:leading-6',

  stationTextMobile: 'text-xs leading-[18px] tablet:text-sm font-normal tablet:leading-4 tracking-normal',
  stationTextDesktop: 'text-xs leading-[18px] tablet:text-sm font-normal tablet:leading-4 tracking-normal',

  price: 'text-xl tablet:text-2xl font-medium tracking-normal',
  currency: 'text-xs ml-[2px]',

  routeTime: 'text-xs font-normal tracking-normal leading-[18px] text-slate-700 dark:text-slate-200',

  carrierWrap: 'flex items-center gap-1',
  carrierName: 'block text-[10px] tablet:text-xs font-normal tracking-normal leading-[18px] break-all',

  detailsBtn: 'items-center justify-center p-2 text-xs font-bold underline dark:text-green-100 text-green-300',

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
    queryFn: async () => {
      return await getOrderStatusAndPdf(orderId || '');
    },
    enabled: !!orderId && isOpen,
  });

  console.log(data);

  return (
    <div className={CLS.card}>
      <div className="flex items-center justify-between gap-1">
        <div className="text-base tablet:text-xl dark:text-green-100 text-green-300">
          № {item.orderNumber.padStart(9, '0')}
        </div>
        <div className="flex items-center gap-2">
          <CalendarArrowDown className="dark:stroke-green-100 stroke-green-300 size-5" />
          <div className={` ${CLS.textBase}`}>{format(item.departureDateTime || new Date(), 'dd.MM.yy')}</div>
        </div>
      </div>

      <div className={'w-full h-[1px] bg-[#e6e6e6] dark:bg-slate-700 rounded-2xl relative my-4'} />

      <div>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <div>
              <p className={`${CLS.cityTitleMobile} ${CLS.textBase}`}>{item.fromCityName}</p>
            </div>
            <LuRoute className="dark:stroke-green-100 stroke-green-300 " />
            <div>
              <p className={`${CLS.cityTitleMobile} ${CLS.textBase}`}>{item.toCityName}</p>
            </div>
          </div>

          <div className={`${CLS.price} ${CLS.textBase}`}>
            {item.totalPrice}
            <span className={CLS.currency}>{item.currency}</span>
          </div>
        </div>

        <div className={'w-full h-[1px] bg-[#e6e6e6] dark:bg-slate-700 rounded-2xl relative my-4'} />

        <div className="flex items-center justify-between">
          <CarrierLabel carrierName={item.carrierName || 'Deafault'} />

          <div>
            <Button
              variant="link"
              className={CLS.detailsBtn}
              onClick={() => {
                setIsOpen((p) => !p);
                setOrderId(item.orderId);
              }}
            >
              {t('details')}
            </Button>
          </div>
        </div>

        <div>
          {isOpen && (
            <div className="mt-4">
              <OrderDetails
                item={item}
                tickets={
                  <>
                    {(isError || error) && (
                      <div className="text-red-500 text-sm">{t(parseErrorKey(error.message))}</div>
                    )}

                    {(isFetching || isLoading) && <MainLoader />}

                    {data?.pdf && (
                      <div>
                        <LoadingPdfBtn pdf={data.pdf} orderNumber={item.orderNumber.padStart(9, '0')} />
                      </div>
                    )}
                    {data?.ticketLinks && (
                      <div>
                        {data?.ticketLinks.map((e) => (
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
    </div>
  );
};

export default OrderCart;
