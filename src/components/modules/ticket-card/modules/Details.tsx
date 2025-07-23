'use client';

import { useLocale, useTranslations } from 'next-intl';
import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { format } from 'date-fns';
import { ChevronRight, Clock3, Route } from 'lucide-react';
import DetailsStops from '../components/DetailsStops';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import DetailsList from '../components/DetailsList';
import DetailsItem from '../components/DetailsItem';
import { toArray } from '@/utils/toArray';
import { MainLoader } from '@/components/shared/MainLoader';
import SwiperImages from '@/components/shared/SwiperImages';
import useDateLocale from '@/hooks/useDateLocale';
import { useTicketsDetails } from '@/store/useTicketsDetails';
import { isEmptyDiscounts } from '@/utils/isEmptyDiscounts';

type Props = {
  id: string;
};

export default function Details({ id }: Props) {
  const currentLocale = useLocale();
  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);
  const { locale: dateLocale } = useDateLocale();

  const ticketDetails = useTicketsDetails((state) => state.ticketDetailsMap[id]);

  const loadingMap = useTicketsDetails((state) => state.loadingMap);
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

        <DetailsStops id={id} />
      </div>

      <div className="space-y-4">
        <DetailsList label={t('luggage')} listClassName="">
          {toArray(ticketDetails?.details?.luggageRules).map((el, idx) => (
            <DetailsItem key={el + idx}>{el}</DetailsItem>
          ))}
        </DetailsList>

        <DetailsList label={t('return_policy')} listClassName="">
          {toArray(ticketDetails?.details?.returnRulesDescription).map((el, idx) => (
            <DetailsItem key={el + idx}>{el}</DetailsItem>
          ))}
        </DetailsList>

        <DetailsList label={t('amenities')} listClassName="flex-row flex-wrap">
          {!!ticketDetails?.details?.amenities?.length && (
            <DetailsItem>{toArray(ticketDetails?.details?.amenities).join(', ')}</DetailsItem>
          )}
        </DetailsList>

        <DetailsList label={t('discounts')} listClassName="flex-row flex-wrap">
          {!isEmptyDiscounts(ticketDetails?.details?.discounts) && (
            <DetailsItem>
              {toArray(ticketDetails?.details?.discounts)
                .map((d) => d.description || d.name)
                .filter(Boolean)
                .join(', ')}
            </DetailsItem>
          )}
        </DetailsList>

        <DetailsList label={t('bus')} listClassName=" flex-wrap">
          {!!ticketDetails?.details?.busName && (
            <>
              <div className="flex flex-row flex-wrap gap-0.5">
                <DetailsItem>
                  {ticketDetails?.details?.busName}
                  {ticketDetails?.details?.busNumber}
                </DetailsItem>
              </div>
              {ticketDetails?.details?.busPictures?.length &&
                ticketDetails?.details?.busPictures?.length > 1 &&
                ticketDetails?.details?.busPictures[0] !== null && (
                  <SwiperImages
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
          )}
        </DetailsList>
      </div>
    </div>
  );
}
