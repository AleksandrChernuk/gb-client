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
import { isEmptyDiscounts } from '@/shared/utils/isEmptyDiscounts';
import { IStops } from '@/shared/types/stops.interface';
import { IReturnRules } from '@/shared/types/return.rules.interface';
import { IDiscount } from '@/shared/types/discount-interface';
import RouteDetailsBusImages from '@/entities/route/RouteDetailsBusImages';
import { RouteDetailsSection, RouteDetailsField } from '@/shared/ui/route-details';
import { ILocation } from '@/shared/types/location.types';
import { translateAmenitiesList } from '@/features/route-card/helpers/translateProviderFeature';
import { Badge } from '@/shared/ui/badge';

type DepartureData = {
  dateTime?: string | null;
  stationAddress?: string | null;
  stationName?: string | null;
  location?: ILocation;
};

type ArrivalData = {
  dateTime?: string | null;
  stationAddress?: string | null;
  stationName?: string | null;
  location?: ILocation;
};

type RouteDetailsData = {
  duration?: string | null;
  stops?: IStops[] | null;
  luggageRules?: string[] | null;
  returnRulesDescription?: string[] | null;
  returnRules?: IReturnRules[] | null;
  discounts?: IDiscount[] | null;
  routeInfo?: string | null;
  amenities?: string[] | null;
};

type BusData = {
  name?: string | null;
  number?: string | null;
  pictures?: string[] | null;
};

type Props = {
  providerName: string;
  departure?: DepartureData;
  arrival?: ArrivalData;
  routeDetails?: RouteDetailsData;
  bus?: BusData;
  loading?: boolean;
};

export default function RouteCardDetails({ providerName, departure, arrival, routeDetails, bus, loading }: Props) {
  const currentLocale = useLocale();
  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);
  const { locale: dateLocale } = useDateLocale();

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center py-8">
        <MainLoader />
      </div>
    );
  }

  const departureLocationName = departure?.location
    ? extractLocationDetails(departure.location, currentLocale).locationName
    : '';
  const arrivalLocationName = arrival?.location
    ? extractLocationDetails(arrival.location, currentLocale).locationName
    : '';

  const busName = bus?.name;
  const hasBusName = busName && busName !== 'bus' && busName !== 'no_plan';
  const hasBusNumber = bus?.number;
  const busPictures = bus?.pictures;
  const hasBusPictures = busPictures && busPictures.length > 1 && busPictures[0] !== null;
  const shouldShowBus = hasBusName || hasBusNumber || hasBusPictures;

  const durationParts = routeDetails?.duration?.split(':');

  return (
    <div className="space-y-4 tablet:grid tablet:grid-cols-2 tablet:gap-2 tablet:space-y-0 py-8">
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h5 className="text-sm font-bold tracking-normal leading-[18px] text-slate-700 dark:text-slate-50">
              {t('route')}:
            </h5>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-200 font-bold text-xs mobile:tracking-normal mobile:leading-[18px]">
              {departure?.dateTime && (
                <>
                  {format(new Date(departure.dateTime), 'EEE dd', { locale: dateLocale })}, {departureLocationName}
                  <ChevronRight size={16} className="stroke-green-300" />
                </>
              )}
              {arrival?.dateTime && (
                <>
                  {format(new Date(arrival.dateTime), 'EEE dd', { locale: dateLocale })}, {arrivalLocationName}
                </>
              )}
            </div>
          </div>

          {durationParts && durationParts.length >= 2 && (
            <div className="gap-2 flex items-center text-xs mobile:font-normal mobile:tracking-normal mobile:leading-[18px]">
              <Route className="rotate-90 stroke-[#6f8b90] dark:stroke-slate-200" size={16} />
              <div className="flex gap-0.5 items-center text-slate-500 dark:text-slate-50">
                {t('travel_time')}:
                <div className="text-slate-500 dark:text-slate-200 font-bold">
                  {durationParts[0]}
                  {t('shortHours')}:{durationParts[1]}
                  {t('shortMinutes')}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Clock3 className="stroke-[#6f8b90] dark:stroke-slate-200" size={16} />
            <p className="text-wrap text-slate-400 dark:text-slate-200 text-xs mobile:font-normal mobile:tracking-normal mobile:leading-[18px]">
              {t('local_time')}
            </p>
          </div>
        </div>

        <RouteDetailsStops
          stops={routeDetails?.stops}
          to_station_address={arrival?.stationAddress}
          to_station_name={arrival?.stationName}
          to_location_name={arrivalLocationName}
          to_departure_date_time={arrival?.dateTime}
          to_arrival_date_time={arrival?.dateTime}
          from_station_address={departure?.stationAddress}
          from_station_name={departure?.stationName}
          from_location_name={departureLocationName}
          from_departure_date_time={departure?.dateTime}
          from_arrival_date_time={departure?.dateTime}
        />
      </div>

      <div className="space-y-4">
        {routeDetails?.luggageRules && routeDetails.luggageRules.length > 0 && (
          <RouteDetailsSection label={t('luggage')} listClassName="">
            <RouteDetailsField>
              <div
                dangerouslySetInnerHTML={{
                  __html: routeDetails.luggageRules.join(''),
                }}
              />
            </RouteDetailsField>
          </RouteDetailsSection>
        )}

        {(routeDetails?.returnRulesDescription || routeDetails?.returnRules) && (
          <RouteDetailsSection label={t('return_policy')}>
            {routeDetails.returnRulesDescription &&
              toArray(routeDetails.returnRulesDescription).map((el, idx) => (
                <RouteDetailsField key={`desc-${idx}`}>{el}</RouteDetailsField>
              ))}

            {routeDetails.returnRules?.map((el, idx) => (
              <RouteDetailsField key={`rule-${idx}`}>{el.title ?? el.description}</RouteDetailsField>
            ))}
          </RouteDetailsSection>
        )}

        <RouteDetailsSection label={t('discounts')} listClassName="flex-row flex-wrap">
          {!isEmptyDiscounts(routeDetails?.discounts) && (
            <RouteDetailsField>
              {toArray(routeDetails?.discounts)
                .map((d) => d.description || d.name)
                .filter(Boolean)
                .join(', ')}
            </RouteDetailsField>
          )}
        </RouteDetailsSection>

        {routeDetails?.routeInfo && (
          <RouteDetailsSection label={t('route_info')} listClassName="flex-row flex-wrap">
            <RouteDetailsField>
              <div
                className="space-y-2"
                dangerouslySetInnerHTML={{
                  __html: routeDetails.routeInfo
                    .split('●')
                    .filter((item) => item.trim())
                    .map((item) => `<div>${item.trim()}</div>`)
                    .join(''),
                }}
              />
            </RouteDetailsField>
          </RouteDetailsSection>
        )}

        {routeDetails?.amenities && routeDetails.amenities.length > 0 && (
          <RouteDetailsSection label={t('amenities')} listClassName="flex-row flex-wrap gap-1">
            <RouteDetailsField>
              {translateAmenitiesList(routeDetails.amenities, providerName, t).map((item) => (
                <Badge variant={'outline'} key={item} className="mr-1 mb-1">
                  {item}
                </Badge>
              ))}
            </RouteDetailsField>
          </RouteDetailsSection>
        )}

        {shouldShowBus && (
          <RouteDetailsSection label={t('bus')} listClassName="flex-wrap">
            <div className="flex flex-row flex-wrap gap-0.5">
              {hasBusName && busName && <RouteDetailsField>{busName.replace(/\[|\]/g, '')}</RouteDetailsField>}
              {hasBusNumber && bus?.number && <RouteDetailsField>{bus.number}</RouteDetailsField>}
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
          </RouteDetailsSection>
        )}
      </div>
    </div>
  );
}
