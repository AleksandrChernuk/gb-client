'use client';

import { format } from 'date-fns';

import { UserCurrentTripType } from '@/types/profile.trips';
import { IconCarriersBus } from '@/assets/icons/IconCarriersBus';
import TicketRoute from '../componets/TicketRoute';

import TicketDetailsToggle from '@/components/modules/ticket-card/components/TicketDetailsToggle';

import { useMemo, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { IRouteDetailsResponse } from '@/types/route.types';
import { getRouteDetails } from '@/actions/route.actions';
import { useLocale } from 'next-intl';

const CLS = {
  collapse: 'overflow-hidden transition-all duration-300 ease-in-out',
  collapseOpen: 'max-h-[4000px] opacity-100',
  collapseClosed: 'max-h-0 opacity-0',
};

type Props = {
  item: UserCurrentTripType;
};

type TrenderExpandedContent = {
  isOpen?: boolean;
  isLoading?: boolean;
  error?: boolean;
  data: IRouteDetailsResponse | null | undefined;
};

const renderExpandedContent = ({ isLoading, error, data }: TrenderExpandedContent) => {
  if (isLoading) {
    return <div className="mt-4 p-4 text-center text-slate-500 dark:text-slate-400">Loading details...</div>;
  }

  if (error) {
    return <div className="mt-4 p-4 text-center text-red-500 dark:text-red-400">Error loading trip details</div>;
  }

  if (data) {
    console.log('empy data', data);
    return (
      <div className="mt-4 space-y-2">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-50">{data.amenities?.join('')}</h4>
      </div>
    );
  }

  return <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">No additional details available</div>;
};

export const TripCard = ({ item }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const locale = useLocale();

  const rowData = useMemo(
    () => ({
      ...(item.routeId && { routeId: item.routeId }),
      ...(item.intervalId && { intervalId: item.intervalId }),
      ...(item.busId && { busId: item.busId }),
      ...(item.fromCityId && { fromCityId: Number(item.fromCityId) }),
      ...(item.toCityId && { toCityId: Number(item.toCityId) }),
      ...(item.fromStationId && { fromStationId: String(item.fromStationId) }),
      ...(item.toStationId && { toStationId: String(item.toStationId) }),
      providerId: item.providerId,
      travelDate: item.departureDateTime || undefined,
      locale,
      currency: item.currency || 'UAH',
      ...(item.timetableId && { timetableId: item.timetableId }),
      ...(item.bustypeId && { bustypeId: item.bustypeId }),
    }),
    [
      item.routeId,
      item.intervalId,
      item.busId,
      item.fromCityId,
      item.toCityId,
      item.fromStationId,
      item.toStationId,
      item.providerId,
      item.departureDateTime,
      item.currency,
      item.timetableId,
      item.bustypeId,
      locale,
    ],
  );

  console.log('rowData', rowData);

  const queryKey = useMemo(
    () => ['currentTripsDetails', item.providerId, item.routeId, item.intervalId, item.timetableId, locale] as const,
    [item.providerId, item.routeId, item.intervalId, item.timetableId, locale],
  );

  console.log('queryKey', queryKey);

  const { data, isLoading, isError } = useQuery<IRouteDetailsResponse | null | undefined>({
    queryKey,
    queryFn: () => getRouteDetails(rowData),
    enabled: isOpen,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="relative shadow-xs tablet:shadow-none rounded-t-2xl tablet:rounded-none">
      <div className="p-4 bg-white shadow-none tablet:p-4 dark:bg-slate-800 rounded-t-2xl tablet:rounded-2xl tablet:shadow-xs">
        <div>
          <div className="flex flex-row items-center justify-between gap-1 tablet:gap-2">
            <TicketRoute
              duration={item.duration}
              location_from={item.fromCityName}
              location_from_name={item.fromStationName}
              location_from_address={item.fromStationAddress || ''}
              date_time_from={format(item.arrivalDateTime || new Date(), 'HH:mm')}
              location_to={item.toCityName || ''}
              location_to_name={item.toStationName || ''}
              location_t_address={item.toStationAddress || ''}
              date_time_to={format(item.departureDateTime || new Date(), 'HH:mm')}
            />

            <div className="text-2xl font-medium tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50 hidden tablet:flex">
              {`${Math.floor(Number(item.totalPrice) || 0)}`}
              <span className="text-xs ml-[2px]">{item.currency}</span>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#e6e6e6] dark:bg-slate-900 rounded-2xl relative my-4" />

          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2 text-xs font-normal tracking-normal leading-[18px] text-slate-700 dark:text-slate-50 shrink grow-0 text-nowrap truncate ...">
              <div className="w-[45px] h-[16px] tablet:w-[70px] tablet:h-[24px] grow-0">
                <IconCarriersBus />
              </div>

              <span className="block text-[10px] tablet:text-xs font-normal tracking-normal leading-[18px] break-all text-slate-700 dark:text-slate-50">
                {item.carrierName || ''}
              </span>
            </div>
            <div>
              <TicketDetailsToggle isOpen={isOpen} toggleOpen={() => setIsOpen((p) => !p)} />
            </div>
          </div>

          <div className={`${CLS.collapse} ${isOpen ? CLS.collapseOpen : CLS.collapseClosed}`}>
            {isOpen && <div className="mt-4">{renderExpandedContent({ data, isLoading, error: isError })}</div>}
          </div>
        </div>
      </div>
      <div className="tablet:hidden">
        <div className="bg-green-300 w-full text-amber-50 py-3 px-4 rounded-none rounded-b-2xl text-base font-bold leading-6 tracking-normal text-center">
          {`${Math.floor(Number(item.totalPrice) || 0)}`} <span className="text-xs ml-[2px]">{item.currency}</span>
        </div>
      </div>
    </div>
  );
};
