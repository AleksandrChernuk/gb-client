'use client';

import { format } from 'date-fns';

import { UserCurrentTripType } from '@/shared/types/profile.trips';
import { IconCarriersBus } from '@/assets/icons/IconCarriersBus';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { useDetails } from '@/features/profile-trip-card/model/useDetails';
import MainLoader from '@/shared/ui/MainLoader';
import Details from '@/features/profile-trip-card/ui/Details';
import TicketRoute from '@/entities/profile/TicketRoute';
import RouteDetailsToggle from '@/entities/route/RouteDetailsToggle';
import MobileDetailTripCard from '@/features/profile-trip-card/ui/MobileDetailTripCard';

const CLS = {
  collapse: 'overflow-hidden transition-all duration-300 ease-in-out',
  collapseOpen: 'max-h-[4000px] opacity-100',
  collapseClosed: 'max-h-0 opacity-0',
};

type Props = {
  item: UserCurrentTripType;
  showDetails?: boolean;
};

export const TripCard = ({ item, showDetails }: Props) => {
  const { isLoading, isOpen, setIsOpen, data } = useDetails({ item });
  const isTabletUp = useMediaQuery('(min-width: 768px)');

  const content = isLoading ? <MainLoader /> : data ? <Details details={data} trip={item} /> : <div>No data</div>;

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
              date_time_from={format(item.departureDateTime || new Date(), 'HH:mm')}
              location_to={item.toCityName || ''}
              location_to_name={item.toStationName || ''}
              location_to_address={item.toStationAddress || ''}
              date_time_to={format(item.arrivalDateTime || new Date(), 'HH:mm')}
            />

            <div className="text-2xl font-medium tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50 hidden tablet:flex">
              {`${Math.floor(Number(item.totalPrice) || 0)}`}
              <span className="text-xs ml-[2px]">{item.currency}</span>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#e6e6e6] dark:bg-slate-900 rounded-2xl relative my-4" />

          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2 text-xs font-normal tracking-normal leading-[18px] text-slate-700 dark:text-slate-50 shrink grow-0 text-nowrap truncate">
              <div className="w-[45px] h-[16px] tablet:w-[70px] tablet:h-[24px] grow-0">
                <IconCarriersBus />
              </div>

              <span className="block text-[10px] tablet:text-xs font-normal tracking-normal leading-[18px] break-all text-slate-700 dark:text-slate-50">
                {item.carrierName || ''}
              </span>
            </div>

            {showDetails ? (
              isTabletUp ? (
                <div className="hidden tablet:block">
                  <RouteDetailsToggle isOpen={isOpen} toggleOpen={() => setIsOpen((p) => !p)} />
                </div>
              ) : (
                <div className="tablet:hidden">
                  <MobileDetailTripCard open={isOpen} onOpenChange={setIsOpen}>
                    {content}
                  </MobileDetailTripCard>
                </div>
              )
            ) : null}
          </div>

          {showDetails
            ? isTabletUp &&
              isOpen && (
                <div className={`${CLS.collapse} ${isOpen ? CLS.collapseOpen : CLS.collapseClosed}`}>
                  {isOpen && <div className="mt-4">{content}</div>}
                </div>
              )
            : null}
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
