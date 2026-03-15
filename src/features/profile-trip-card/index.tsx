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
import { cn } from '@/shared/lib/utils';

type Props = {
  item: UserCurrentTripType;
  showDetails?: boolean;
};

export const TripCard = ({ item, showDetails }: Props) => {
  const { isLoading, isOpen, setIsOpen, data } = useDetails({ item });
  const isTabletUp = useMediaQuery('(min-width: 768px)');

  const content = isLoading ? <MainLoader /> : data ? <Details details={data} trip={item} /> : null;

  return (
    <div className="relative shadow-xs tablet:shadow-none rounded-t-2xl tablet:rounded-none">
      <div className="p-4 bg-white dark:bg-slate-800 rounded-t-2xl tablet:rounded-2xl tablet:shadow-xs">
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

          <div className="hidden tablet:flex text-2xl font-medium leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
            {item.totalPrice}
            <span className="text-xs ml-0.5">{item.currency}</span>
          </div>
        </div>

        <div className="w-full h-px bg-[#e6e6e6] dark:bg-slate-900 my-4" />

        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-xs font-normal leading-[18px] text-slate-700 dark:text-slate-50 truncate">
            <div className="w-[45px] h-4 tablet:w-[70px] tablet:h-6 shrink-0">
              <IconCarriersBus />
            </div>
            <span className="text-[10px] tablet:text-xs leading-[18px] text-slate-700 dark:text-slate-50 truncate">
              {item.carrierName || ''}
            </span>
          </div>

          {showDetails &&
            (isTabletUp ? (
              <RouteDetailsToggle isOpen={isOpen} toggleOpen={() => setIsOpen((p) => !p)} />
            ) : (
              <MobileDetailTripCard open={isOpen} onOpenChange={setIsOpen}>
                {content}
              </MobileDetailTripCard>
            ))}
        </div>

        {showDetails && isTabletUp && (
          <div
            className={cn(
              'overflow-hidden transition-all duration-300 ease-in-out',
              isOpen ? 'max-h-[4000px] opacity-100' : 'max-h-0 opacity-0',
            )}
          >
            {isOpen && <div className="mt-4">{content}</div>}
          </div>
        )}
      </div>

      {/* Mobile price bar */}
      <div className="tablet:hidden bg-green-300 w-full text-white py-3 px-4 rounded-b-2xl text-base font-bold leading-6 text-center">
        {item.totalPrice}
        <span className="text-xs ml-0.5">{item.currency}</span>
      </div>
    </div>
  );
};
