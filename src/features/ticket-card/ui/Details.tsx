'use client';

import { useLocale, useTranslations } from 'next-intl';
import { format } from 'date-fns';
import { ChevronRight, Clock3, Route } from 'lucide-react';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import useDateLocale from '@/shared/hooks/useDateLocale';
import { useTicketsDetails } from '@/shared/store/useTicketsDetails';
import { toArray } from '@/shared/utils/toArray';
import MainLoader from '@/shared/ui/MainLoader';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import RouteDetailsStops from '@/entities/route/RouteDetailsStops';
import RouteDetailsList from '@/entities/route/RouteDetailsList';
import DetailsItem from '@/entities/route/RouteDetailsItem';
import { isEmptyDiscounts } from '@/shared/utils/isEmptyDiscounts';
import RouteDetailsBusImages from '@/entities/route/RouteDetailsBusImages';

type Props = {
  id: string;
};

export default function Details({ id }: Props) {
  const currentLocale = useLocale();
  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);
  const { locale: dateLocale } = useDateLocale();

  const ticketDetails = useTicketsDetails((state) => state.ticketDetailsMap[id]);

  const loadingMap = useTicketsDetails((state) => state.loadingMap);
  const busName = ticketDetails?.details?.busName;
  const busNumber = ticketDetails?.details?.busNumber;
  const busPictures = toArray(ticketDetails?.details?.busPictures);
  const showPictures = busPictures.length > 1 && busPictures[0] !== null;
  const showBusDetails = busName !== 'no_plan' || (busNumber && busNumber.trim() !== '') || showPictures;

  if (loadingMap[id])
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
              {` ${format(ticketDetails?.departure.dateTime || new Date(), 'EEE dd', { locale: dateLocale })}, 
                    ${ticketDetails && extractLocationDetails(ticketDetails?.departure.fromLocation, currentLocale).locationName}`}
              <ChevronRight size={16} className="stroke-green-300" />
              {` ${format(ticketDetails?.arrival.dateTime || new Date(), 'EEE dd', { locale: dateLocale })}, 
                   ${ticketDetails && extractLocationDetails(ticketDetails?.arrival.toLocation, currentLocale).locationName}`}
            </div>
          </div>

          <div className="gap-2 flex items-center text-slate-400 dark:text-slate-200 text-xs mobile:font-normal mobile:tracking-normal mobile:leading-[18px]">
            <Route className="rotate-90 stroke-[#6f8b90] dark:stroke-slate-200" size={16} />
            <span>
              {t('travel_time')}:{' '}
              <span className="text-slate-400 dark:text-slate-200 ">
                {ticketDetails.duration?.split(':')[0]}
                {t('shortHours')}:{ticketDetails.duration?.split(':')[1]}
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
          stops={ticketDetails.details?.stops}
          to_station_address={ticketDetails?.departure.stationAddress}
          to_station_name={ticketDetails?.departure?.stationName}
          to_location_name={
            ticketDetails && extractLocationDetails(ticketDetails?.departure?.fromLocation, currentLocale).locationName
          }
          to_departure_date_time={ticketDetails?.departure.dateTime}
          to_arrival_date_time={ticketDetails?.departure.dateTime}
          from_station_address={ticketDetails?.arrival.stationAddress}
          from_station_name={ticketDetails?.arrival?.stationName}
          from_location_name={
            ticketDetails && extractLocationDetails(ticketDetails?.arrival?.toLocation, currentLocale).locationName
          }
          from_departure_date_time={ticketDetails?.arrival.dateTime}
          from_arrival_date_time={ticketDetails?.arrival.dateTime}
        />
      </div>

      <div className="space-y-4">
        {!!ticketDetails?.details?.luggageRules && ticketDetails?.details?.luggageRules.length !== 0 && (
          <RouteDetailsList label={t('luggage')} listClassName="">
            <DetailsItem>{toArray(ticketDetails.details.luggageRules).join(', ')}</DetailsItem>
          </RouteDetailsList>
        )}

        <RouteDetailsList label={t('return_policy')} listClassName="">
          {toArray(ticketDetails?.details?.returnRulesDescription).map((el, idx) => (
            <DetailsItem key={idx + 1}>{el}</DetailsItem>
          ))}
        </RouteDetailsList>

        <RouteDetailsList label={t('discounts')} listClassName="flex-row flex-wrap">
          {!isEmptyDiscounts(ticketDetails?.details?.discounts) && (
            <DetailsItem>
              {toArray(ticketDetails?.details?.discounts)
                .map((d) => d.description || d.name)
                .filter(Boolean)
                .join(', ')}
            </DetailsItem>
          )}
        </RouteDetailsList>

        <RouteDetailsList label={t('route_info')} listClassName="flex-row flex-wrap">
          {ticketDetails?.details?.routeInfo && (
            <DetailsItem>{ticketDetails?.details?.routeInfo.replace(/●\s*/g, ' ')}</DetailsItem>
          )}
        </RouteDetailsList>

        <RouteDetailsList label={t('amenities')} listClassName="flex-row flex-wrap">
          {!!ticketDetails?.details?.amenities?.length && (
            <DetailsItem>{toArray(ticketDetails?.details?.amenities).join(', ')}</DetailsItem>
          )}
        </RouteDetailsList>

        {showBusDetails && (
          <RouteDetailsList label={t('bus')} listClassName=" flex-wrap">
            <>
              <div className="flex flex-row flex-wrap gap-0.5">
                <DetailsItem>{!!busName && busName.replace(/\[|\]/g, '')}</DetailsItem>
                <DetailsItem>{ticketDetails?.details?.busNumber}</DetailsItem>
              </div>
              {ticketDetails?.details?.busPictures?.length &&
                ticketDetails?.details?.busPictures?.length > 1 &&
                ticketDetails?.details?.busPictures[0] !== null && (
                  <RouteDetailsBusImages
                    items={toArray(ticketDetails?.details?.busPictures)?.map((el, i) => ({
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
