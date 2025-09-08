'use client';

import useDateLocale from '@/hooks/useDateLocale';
import { UserOrdersType } from '@/types/payments.Info.types';
import Image from 'next/image';
import { IconRouteLeft } from '@/assets/icons/IconRouteLeft';
import { IconRouteRigth } from '@/assets/icons/IconRouteRigth';
import arrow from '@/assets/icons/arrow-mobile.svg';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import OrderTicket from './OrderTicket';
import OrderDetails from './OrderDetails';
import { User } from 'lucide-react';

const CLS = {
  card: 'border border-slate-50 dark:border-slate-700 p-4 bg-white shadow-xs tablet:p-4 dark:bg-slate-800 rounded-2xl',
  textBase: 'text-slate-700 dark:text-slate-50',
  textMuted: 'text-slate-400 dark:text-slate-200',
  line: 'w-full h-[1px] bg-[#e6e6e6] dark:bg-slate-700 rounded-2xl relative my-4',

  badgeRight: 'text:xs tablet:text-base font-bold text-green-300 text-right mb-4',
  cityTitleMobile: 'text-sm font-bold tracking-normal leading-[16.8px] tablet:text-xl laptop:text-2xl tablet:leading-6',
  cityTitleDesktop: 'text-2xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px]',
  stationTextMobile: 'text-xs leading-[18px] tablet:text-sm font-normal tablet:leading-4 tracking-normal',
  stationTextDesktop: 'text-xs leading-[18px] tablet:text-sm font-normal tablet:leading-4 tracking-normal',

  price: 'text-2xl font-medium tracking-normal leading-[28.8px] tablet:text-[32px] tablet:leading-[38.4px]',
  currency: 'text-xs ml-[2px]',

  routeTime: 'text-xs font-normal tracking-normal leading-[18px] text-slate-700 dark:text-slate-200',

  carrierWrap: 'flex items-center gap-1',
  carrierName: 'block text-[10px] tablet:text-xs font-normal tracking-normal leading-[18px] break-all',

  detailsBtn: 'items-center justify-center p-2 text-xs font-bold underline',

  collapse: 'overflow-hidden transition-all duration-300 ease-in-out',
  collapseOpen: 'max-h-[4000px] opacity-100',
  collapseClosed: 'max-h-0 opacity-0',

  ticketsTitle: 'mb-4 text-base tablet:text-lg font-medium tracking-normal leading-[18px] break-all',
};

type Props = {
  item: UserOrdersType;
};

const OrderCart = ({ item }: Props) => {
  const { locale } = useDateLocale();
  const t = useTranslations(MESSAGE_FILES.COMMON);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={CLS.card}>
      <div className={CLS.badgeRight}>{t(`${item.orderType}`)}</div>

      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 tablet:hidden">
            <div className="w-[26px] laptop:w-10 h-[80px] laptop:h-24 shrink-0">
              <Image src={arrow} alt="arrow" className="size-full" unoptimized />
            </div>

            <div>
              <div className="flex flex-col justify-between gap-2 tablet:gap-3">
                <div>
                  <p className={`${CLS.cityTitleMobile} ${CLS.textBase}`}>{item.fromCityName}</p>
                  <p className={`${CLS.stationTextMobile} ${CLS.textMuted}`}>{item.fromStationName}</p>
                </div>

                <div className={`text-xs font-normal tracking-normal leading-[18px] ${CLS.textBase}`}>
                  {format(item.departureDateTime || new Date(), 'HH:mm')},{' '}
                  {format(item.departureDateTime || new Date(), 'dd.MM', { locale: locale })}
                </div>

                <div>
                  <p className={`${CLS.cityTitleMobile} ${CLS.textBase}`}>{item.toCityName}</p>
                  <p className={`${CLS.stationTextMobile} ${CLS.textMuted}`}>{item.toStationName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop grid */}
          <div className="hidden tablet:grid justify-between w-full grid-cols-3 gap-2">
            <div className="flex flex-col gap-1">
              <div className={`${CLS.cityTitleDesktop} ${CLS.textBase}`}>{item.fromCityName}</div>
              <div className={`ttext-xs ${CLS.stationTextDesktop} ${CLS.textMuted}`}>{item.fromStationName}</div>
            </div>

            <div className="flex items-center justify-center gap-1">
              <div className="w-[50px] h-[17px]">
                <IconRouteLeft />
              </div>
              <div className={CLS.routeTime}>
                {format(item.departureDateTime || new Date(), 'HH:mm')},{' '}
                {format(item.departureDateTime || new Date(), 'dd.MM', { locale: locale })}
              </div>
              <div className="w-[50px] h-[17px]">
                <IconRouteRigth />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className={`${CLS.cityTitleDesktop} ${CLS.textBase}`}>{item.toCityName}</div>
              <div className={`${CLS.stationTextDesktop} ${CLS.textMuted}`}>{item.toStationName}</div>
            </div>
          </div>

          <div>
            <div className={`${CLS.price} ${CLS.textBase}`}>
              {item.totalPrice}
              <span className={CLS.currency}>{item.currency}</span>
            </div>
          </div>
        </div>

        <div className={CLS.line} />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <User size={16} className="stroke-slate-700 dark:stroke-slate-50" />
            <span className={`text-sm ${CLS.textBase}`}>{item.tickets.length}</span>
          </div>
          <div>
            <Button variant="link" className={CLS.detailsBtn} onClick={() => setIsOpen((p) => !p)}>
              {t('details')}
            </Button>
          </div>
        </div>

        <div className={`${CLS.collapse} ${isOpen ? CLS.collapseOpen : CLS.collapseClosed}`}>
          {isOpen && (
            <div className="mt-4 flex flex-col gap-4">
              <div>
                <p className={`${CLS.ticketsTitle} ${CLS.textBase}`}>Квитки</p>
                <ul className="space-y-6 tablet:space-y-8">
                  {item.tickets.map((ticket) => (
                    <OrderTicket ticket={ticket} key={ticket.ticketId} />
                  ))}
                </ul>
              </div>
              <div>
                <OrderDetails item={item} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCart;
