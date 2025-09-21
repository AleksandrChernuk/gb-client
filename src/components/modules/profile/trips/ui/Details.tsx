'use client';

import { useTranslations } from 'next-intl';
import { format } from 'date-fns';
import { ChevronRight, Clock3, Route } from 'lucide-react';
import { MESSAGE_FILES } from '@/config/message.file.constans';

import { toArray } from '@/utils/toArray';
import SwiperImages from '@/components/shared/SwiperImages';
import useDateLocale from '@/hooks/useDateLocale';
import { isEmptyDiscounts } from '@/utils/isEmptyDiscounts';
import { IRouteDetailsResponse } from '@/types/route.types';
import { UserCurrentTripType } from '@/types/profile.trips';
import DetailsStops from '@/components/modules/ticket-card/components/DetailsStops';
import DetailsList from '@/components/modules/ticket-card/components/DetailsList';
import DetailsItem from '@/components/modules/ticket-card/components/DetailsItem';

type Props = { details: IRouteDetailsResponse; trip: UserCurrentTripType };

export default function Details({ details, trip }: Props) {
  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);

  const { locale: dateLocale } = useDateLocale();

  const busPictures = toArray(details?.busPictures);

  const showPictures = busPictures.length > 1 && busPictures[0] !== null;

  const showBusDetails =
    details.busName !== 'no_plan' || (details.busNumber && details.busNumber.trim() !== '') || showPictures;
  console.log(details);
  return (
    <div className="space-y-4 tablet:grid tablet:grid-cols-2 tablet:gap-2 mt-8 tablet:space-y-0">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-start flex-col gap-2">
            <h5 className="text-sm font-bold tracking-normal leading-[18px] text-green-300">{t('route')}:</h5>
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

        <DetailsStops
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
        {!!details?.luggageRules && details?.luggageRules.length !== 0 && (
          <DetailsList label={t('luggage')} listClassName="">
            <DetailsItem>{toArray(details.luggageRules).join(', ')}</DetailsItem>
          </DetailsList>
        )}

        <DetailsList label={t('return_policy')} listClassName="">
          {toArray(details?.returnRulesDescription).map((el, idx) => (
            <DetailsItem key={idx + 1}>{el}</DetailsItem>
          ))}
        </DetailsList>

        <DetailsList label={t('discounts')} listClassName="flex-row flex-wrap">
          {!isEmptyDiscounts(details?.discounts) && (
            <DetailsItem>
              {toArray(details?.discounts)
                .map((d) => d.description || d.name)
                .filter(Boolean)
                .join(', ')}
            </DetailsItem>
          )}
        </DetailsList>

        <DetailsList label={t('route_info')} listClassName="flex-row flex-wrap">
          {details?.routeInfo && <DetailsItem>{details?.routeInfo.replace(/●\s*/g, ' ')}</DetailsItem>}
        </DetailsList>

        <DetailsList label={t('amenities')} listClassName="flex-row flex-wrap">
          {!!details?.amenities?.length && <DetailsItem>{toArray(details?.amenities).join(', ')}</DetailsItem>}
        </DetailsList>

        <DetailsList label={t('return_policy')} listClassName="text-[12px]">
          {toArray(details?.returnRulesDescription).map((el, idx) => (
            <DetailsItem key={idx + 1}>{el}</DetailsItem>
          ))}
        </DetailsList>

        {showBusDetails && (
          <DetailsList label={t('bus')} listClassName=" flex-wrap">
            <>
              <div className="flex flex-row flex-wrap gap-0.5">
                <DetailsItem>{!!details.busName && details.busName.replace(/\[|\]/g, '')}</DetailsItem>
                <DetailsItem>{details?.busNumber}</DetailsItem>
              </div>
              {details?.busPictures?.length && details?.busPictures?.length > 1 && details?.busPictures[0] !== null && (
                <SwiperImages
                  items={toArray(details?.busPictures)?.map((el, i) => ({
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
          </DetailsList>
        )}
      </div>
    </div>
  );
}
