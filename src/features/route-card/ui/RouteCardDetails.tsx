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
import { IRouteResponse } from '@/shared/types/route.types';
import RouteDetailsBusImages from '@/entities/route/RouteDetailsBusImages';

type Props = {
  route: IRouteResponse;
  loading?: boolean;
};

export default function RouteCardDetails({ route, loading }: Props) {
  const currentLocale = useLocale();
  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);
  const { locale: dateLocale } = useDateLocale();

  const busName = route?.details?.busName;
  console.log(route?.details);
  if (loading)
    return (
      <div className="h-full pt-10 flex items-center justify-center">
        <MainLoader />
      </div>
    );

  return (
    <div className="space-y-4 tablet:grid tablet:grid-cols-2 tablet:gap-2 tablet:mt-8 tablet:space-y-0 py-10">
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
        {route?.details?.luggageRules && !!route?.details?.luggageRules.length && (
          <RouteDetailsList label={t('luggage')} listClassName="">
            <DetailsItem>
              {route.details.luggageRules === 'string' ? (
                <span dangerouslySetInnerHTML={{ __html: route?.details?.routeInfo || '' }} />
              ) : (
                toArray(route.details.luggageRules).map((el) => (
                  <span key={el} dangerouslySetInnerHTML={{ __html: el || '' }} />
                ))
              )}
            </DetailsItem>
          </RouteDetailsList>
        )}

        {(route?.details?.returnRulesDescription || route?.details?.returnRules) && (
          <RouteDetailsList label={t('return_policy')}>
            {toArray(route?.details?.returnRulesDescription).map((el, idx) => (
              <DetailsItem key={idx + 1}>{el}</DetailsItem>
            ))}
            {route?.details?.returnRules &&
              route?.details?.returnRules.map((el, idx) => <DetailsItem key={idx + 1}>{el.title}</DetailsItem>)}
          </RouteDetailsList>
        )}

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
          {route?.details?.routeInfo && (
            <DetailsItem>{<span dangerouslySetInnerHTML={{ __html: route?.details?.routeInfo || '' }} />}</DetailsItem>
          )}
        </RouteDetailsList>

        <RouteDetailsList label={t('amenities')} listClassName="flex-row flex-wrap">
          {!!route?.details?.amenities?.length && (
            <DetailsItem>{toArray(route?.details?.amenities).join(', ')}</DetailsItem>
          )}
        </RouteDetailsList>

        {(() => {
          const hasBusName = busName && busName !== 'bus' && busName !== 'no_plan';
          const hasBusNumber = route?.details?.busNumber;
          const busPictures = route?.details?.busPictures;
          const hasBusPictures = busPictures && busPictures.length > 1 && busPictures[0] !== null;

          // Показываем блок только если есть хотя бы одно из: валидное имя, номер или фото
          const shouldShowBus = hasBusName || hasBusNumber || hasBusPictures;

          return (
            shouldShowBus && (
              <RouteDetailsList label={t('bus')} listClassName=" flex-wrap">
                <>
                  <div className="flex flex-row flex-wrap gap-0.5">
                    {hasBusName && <DetailsItem>{busName.replace(/\[|\]/g, '')}</DetailsItem>}
                    {hasBusNumber && route?.details && <DetailsItem>{route.details.busNumber}</DetailsItem>}
                  </div>
                  {hasBusPictures && busPictures && (
                    <RouteDetailsBusImages
                      items={toArray(busPictures).map((el, i) => ({
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
            )
          );
        })()}
      </div>
    </div>
  );
}
