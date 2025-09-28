'use client';

import { useLocale, useTranslations } from 'next-intl';
import { format } from 'date-fns';
import { ChevronRight, Clock3, Route } from 'lucide-react';
import MainLoader from '@/shared/ui/MainLoader';
import useDateLocale from '@/shared/hooks/useDateLocale';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { toArray } from '@/shared/utils/toArray';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import RouteDetailsStops from '@/entities/route/RouteDetailsStops';
import RouteDetailsList from '@/entities/route/RouteDetailsList';
import DetailsItem from '@/entities/route/RouteDetailsItem';
import { isEmptyDiscounts } from '@/shared/utils/isEmptyDiscounts';
import RouteDetailsBusImages from '@/entities/route/RouteDetailsBusImages';
import { IRouteResponse } from '@/shared/types/route.types';

type Props = {
  route: IRouteResponse;
  loading?: boolean;
};

export default function RouteCardDetails({ route, loading }: Props) {
  const currentLocale = useLocale();
  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);
  const { locale: dateLocale } = useDateLocale();

  const busName = route?.details?.busName;
  const busNumber = route?.details?.busNumber;
  const busPictures = toArray(route?.details?.busPictures);
  const showPictures = busPictures.length > 1 && busPictures[0] !== null;
  const showBusDetails = busName !== 'no_plan' || (busNumber && busNumber.trim() !== '') || showPictures;

  if (loading)
    return (
      <div className="pt-10 flex items-center justify-center ">
        <MainLoader />
      </div>
    );

  return (
    <div className="space-y-4 tablet:grid tablet:grid-cols-2 tablet:gap-2 tablet:mt-8 tablet:space-y-0">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h5 className="text-sm font-bold tracking-normal leading-[18px] text-slate-700 dark:text-slate-50">
              {t('route')}:
            </h5>
            <div className="flex items-center gap-2  text-slate-400 dark:text-slate-200  text-xs mobile:font-normal mobile:tracking-normal mobile:leading-[18px]">
              {` ${format(route?.departure.dateTime || new Date(), 'EEE dd', { locale: dateLocale })}, 
                    ${route && extractLocationDetails(route?.departure.fromLocation, currentLocale).locationName}`}
              <ChevronRight size={16} className="stroke-green-300" />
              {` ${format(route?.arrival.dateTime || new Date(), 'EEE dd', { locale: dateLocale })}, 
                   ${route && extractLocationDetails(route?.arrival.toLocation, currentLocale).locationName}`}
            </div>
          </div>

          <div className="gap-2 flex items-center text-slate-400 dark:text-slate-200 text-xs mobile:font-normal mobile:tracking-normal mobile:leading-[18px]">
            <Route className="rotate-90 stroke-[#6f8b90] dark:stroke-slate-200" size={16} />
            <span>
              {t('travel_time')}:{' '}
              <span className="text-slate-400 dark:text-slate-200 ">
                {route.duration?.split(':')[0]}
                {t('shortHours')}:{route.duration?.split(':')[1]}
                {t('shortMinutes')}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2 ">
            <Clock3 className="stroke-[#6f8b90] dark:stroke-slate-200" size={16} />
            <p className="text-wrap text-slate-400 dark:text-slate-200  text-xs mobile:font-normal mobile:tracking-normal mobile:leading-[18px]">
              {t('local_time')}
            </p>
          </div>
        </div>

        <RouteDetailsStops
          stops={route.details?.stops}
          to_station_address={route?.departure.stationAddress}
          to_station_name={route?.departure?.stationName}
          to_location_name={route && extractLocationDetails(route?.departure?.fromLocation, currentLocale).locationName}
          to_departure_date_time={route?.departure.dateTime}
          to_arrival_date_time={route?.departure.dateTime}
          from_station_address={route?.arrival.stationAddress}
          from_station_name={route?.arrival?.stationName}
          from_location_name={route && extractLocationDetails(route?.arrival?.toLocation, currentLocale).locationName}
          from_departure_date_time={route?.arrival.dateTime}
          from_arrival_date_time={route?.arrival.dateTime}
        />
      </div>

      <div className="space-y-4">
        {!!route?.details?.luggageRules && route?.details?.luggageRules.length !== 0 && (
          <RouteDetailsList label={t('luggage')} listClassName="">
            <DetailsItem>{toArray(route.details.luggageRules).join(', ')}</DetailsItem>
          </RouteDetailsList>
        )}

        <RouteDetailsList label={t('return_policy')} listClassName="">
          {toArray(route?.details?.returnRulesDescription).map((el, idx) => (
            <DetailsItem key={idx + 1}>{el}</DetailsItem>
          ))}
        </RouteDetailsList>

        <RouteDetailsList label={t('discounts')} listClassName="flex-row flex-wrap">
          {!isEmptyDiscounts(route?.details?.discounts) && (
            <DetailsItem>
              {toArray(route?.details?.discounts)
                .map((d) => d.description || d.name)
                .filter(Boolean)
                .join(', ')}
            </DetailsItem>
          )}
        </RouteDetailsList>

        <RouteDetailsList label={t('route_info')} listClassName="flex-row flex-wrap">
          {route?.details?.routeInfo && <DetailsItem>{route?.details?.routeInfo.replace(/●\s*/g, ' ')}</DetailsItem>}
        </RouteDetailsList>

        <RouteDetailsList label={t('amenities')} listClassName="flex-row flex-wrap">
          {!!route?.details?.amenities?.length && (
            <DetailsItem>{toArray(route?.details?.amenities).join(', ')}</DetailsItem>
          )}
        </RouteDetailsList>

        {showBusDetails && (
          <RouteDetailsList label={t('bus')} listClassName=" flex-wrap">
            <>
              <div className="flex flex-row flex-wrap gap-0.5">
                <DetailsItem>{!!busName && busName.replace(/\[|\]/g, '')}</DetailsItem>
                <DetailsItem>{route?.details?.busNumber}</DetailsItem>
              </div>
              {route?.details?.busPictures?.length &&
                route?.details?.busPictures?.length > 1 &&
                route?.details?.busPictures[0] !== null && (
                  <RouteDetailsBusImages
                    items={toArray(route?.details?.busPictures)?.map((el, i) => ({
                      src: el,
                      alt: `bus img ${i + 1}`,
                      width: 200,
                      height: 200,
                    }))}
                    slidesPerView={3}
                    spaceBetween={20}
                  />
                )}
            </>
          </RouteDetailsList>
        )}
      </div>
    </div>
  );
}
