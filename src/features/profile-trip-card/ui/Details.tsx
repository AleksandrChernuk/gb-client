'use client';

import { useTranslations } from 'next-intl';
import { format } from 'date-fns';
import { ChevronRight, Clock3, Route } from 'lucide-react';

import { IRouteDetailsResponse } from '@/shared/types/route.types';
import { UserCurrentTripType } from '@/shared/types/profile.trips';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import useDateLocale from '@/shared/hooks/useDateLocale';
import { toArray } from '@/shared/utils/toArray';
import RouteDetailsStops from '@/entities/route/RouteDetailsStops';
import RouteDetailsList from '@/entities/route/RouteDetailsList';
import DetailsItem from '@/entities/route/RouteDetailsItem';
import RouteDetailsBusImages from '@/entities/route/RouteDetailsBusImages';
import { isEmptyDiscounts } from '@/shared/utils/isEmptyDiscounts';

type Props = { details: IRouteDetailsResponse; trip: UserCurrentTripType };

export default function Details({ details, trip }: Props) {
  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);

  const { locale: dateLocale } = useDateLocale();

  const stripLinks = (html: string) => {
    return html.replace(/<a[^>]*>(.*?)<\/a>/gi, '$1').replace(/https?:\/\/[^\s<]+/gi, '');
  };

  const busName = details?.busName;

  return (
    <div className="space-y-4 tablet:grid tablet:grid-cols-2 tablet:gap-2 mt-8 tablet:space-y-0">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-start flex-col gap-2">
            <h5 className="text-sm font-bold tracking-normal leading-[18px] text-green-200">{t('route')}:</h5>
            <div className="flex items-center gap-2 text-slate-400 dark:text-slate-200  text-xs mobile:font-normal mobile:tracking-normal mobile:leading-[18px]">
              {` ${format(trip?.departureDateTime || new Date(), 'EEE dd', { locale: dateLocale })}, 
                    ${trip.fromCityName}`}
              <ChevronRight size={16} className="stroke-green-300 shrink-0" />
              {` ${format(trip?.arrivalDateTime || new Date(), 'EEE dd', { locale: dateLocale })}, 
                   ${trip.toCityName}`}
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-200  text-xs mobile:font-normal mobile:tracking-normal mobile:leading-[18px]">
            <Route className="rotate-90 stroke-[#6f8b90] dark:stroke-slate-200" size={16} />
            <span>
              {t('travel_time')}:{' '}
              <span className="text-slate-400 dark:text-slate-200 ">
                {trip.duration?.split(':')[0]}
                {t('shortHours')}:{trip.duration?.split(':')[1]}
                {t('shortMinutes')}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2 ">
            <Clock3 className="stroke-[#6f8b90] dark:stroke-slate-200 " size={16} />
            <p className="text-wrap text-slate-400 dark:text-slate-200  text-xs mobile:font-normal mobile:tracking-normal mobile:leading-[18px]">
              {t('local_time')}
            </p>
          </div>
        </div>

        <RouteDetailsStops
          stops={details.stops}
          to_station_address={trip.fromStationAddress}
          to_station_name={trip.fromStationName}
          to_location_name={trip.fromCityName}
          to_departure_date_time={trip.departureDateTime}
          to_arrival_date_time={trip.departureDateTime}
          from_station_address={trip.toStationAddress}
          from_station_name={trip.toStationName}
          from_location_name={trip.toCityName}
          from_departure_date_time={trip.arrivalDateTime}
          from_arrival_date_time={trip.arrivalDateTime}
          classNameItemContainer={'tablet:dark:bg-slate-800'}
        />
      </div>

      <div className="space-y-4">
        {details?.luggageRules && !!details?.luggageRules.length && (
          <RouteDetailsList label={t('luggage')} listClassName="">
            <DetailsItem>
              {details.luggageRules.map((e) => {
                const cleanHTML = stripLinks(e || '');
                return <span key={e} dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
              })}
            </DetailsItem>
          </RouteDetailsList>
        )}

        {(details?.returnRulesDescription || details?.returnRules) && (
          <RouteDetailsList label={t('return_policy')}>
            {toArray(details?.returnRulesDescription).map((el, idx) => (
              <DetailsItem key={idx + 1}>{el}</DetailsItem>
            ))}
            {details?.returnRules &&
              details?.returnRules.map((el, idx) => (
                <DetailsItem key={idx + 1}>{el.title ?? el.description}</DetailsItem>
              ))}
          </RouteDetailsList>
        )}

        <RouteDetailsList label={t('discounts')} listClassName="flex-row flex-wrap">
          {!isEmptyDiscounts(details?.discounts) && (
            <DetailsItem>
              {toArray(details?.discounts)
                .map((d) => d.description || d.name)
                .filter(Boolean)
                .join(', ')}
            </DetailsItem>
          )}
        </RouteDetailsList>

        <RouteDetailsList label={t('route_info')} listClassName="flex-row flex-wrap">
          {details?.routeInfo && (
            <DetailsItem>{<span dangerouslySetInnerHTML={{ __html: details?.routeInfo || '' }} />}</DetailsItem>
          )}
        </RouteDetailsList>

        <RouteDetailsList label={t('amenities')} listClassName="flex-row flex-wrap">
          {!!details?.amenities?.length && <DetailsItem>{toArray(details?.amenities).join(', ')}</DetailsItem>}
        </RouteDetailsList>

        {(() => {
          const hasBusName = busName && busName !== 'bus' && busName !== 'no_plan';
          const hasBusNumber = details?.busNumber;
          const busPictures = details?.busPictures;
          const hasBusPictures = busPictures && busPictures.length > 1 && busPictures[0] !== null;

          // Показываем блок только если есть хотя бы одно из: валидное имя, номер или фото
          const shouldShowBus = hasBusName || hasBusNumber || hasBusPictures;

          return (
            shouldShowBus && (
              <RouteDetailsList label={t('bus')} listClassName=" flex-wrap">
                <>
                  <div className="flex flex-row flex-wrap gap-0.5">
                    {hasBusName && <DetailsItem>{busName.replace(/\[|\]/g, '')}</DetailsItem>}
                    {hasBusNumber && details && <DetailsItem>{details.busNumber}</DetailsItem>}
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
