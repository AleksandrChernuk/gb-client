import { useCurrentTicket } from '@/store/useCurrentTicket';
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

type Props = {
  id: string;
};

export default function Details({ id }: Props) {
  const currentLocale = useLocale();
  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);

  const ticketDetails = useCurrentTicket((state) => state.tickets[id]);
  const loadingDetails = useCurrentTicket((state) => state.loadingTickets);
  const isLoading = loadingDetails[id];

  if (isLoading)
    return (
      <div className="mt-4">
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
              {` ${format(ticketDetails?.departure.date_time || new Date(), 'EEE dd')}, 
                    ${ticketDetails && extractLocationDetails(ticketDetails?.departure.fromLocation, currentLocale).locationName}`}
              <ChevronRight size={16} className="stroke-green-300" />
              {` ${format(ticketDetails?.arrival.date_time || new Date(), 'EEE dd')}, 
                   ${ticketDetails && extractLocationDetails(ticketDetails?.arrival.toLocation, currentLocale).locationName}`}
            </div>
          </div>

          <div className="gap-2 flex items-center text-slate-400 dark:text-slate-200 text-xs mobile:font-normal mobile:tracking-normal mobile:leading-[18px]">
            <Route className="rotate-90 stroke-[#6f8b90] dark:stroke-slate-200" size={16} />
            <span>{t('travel_time')}:</span>
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
          {toArray(ticketDetails?.details?.luggage_rules).map((el, idx) => (
            <DetailsItem key={el + idx}>{el}</DetailsItem>
          ))}
        </DetailsList>

        <DetailsList label={t('return_policy')} listClassName="">
          {toArray(ticketDetails?.details?.return_rules_description).map((el, idx) => (
            <DetailsItem key={el + idx}>{el}</DetailsItem>
          ))}
        </DetailsList>

        <DetailsList label={t('amenities')} listClassName="">
          {toArray(ticketDetails?.details?.amenities).map((el) => (
            <DetailsItem key={el}>{el}</DetailsItem>
          ))}
        </DetailsList>

        <DetailsList label={t('discounts')} listClassName="flex-row flex-wrap">
          {toArray(ticketDetails?.details?.discounts).map((el) => (
            <DetailsItem key={el.id}>{el.description || el.name}</DetailsItem>
          ))}
        </DetailsList>

        <DetailsList label={t('bus')} listClassName=" flex-wrap">
          {!!ticketDetails?.details?.bus_name && (
            <>
              <div className="flex flex-row flex-wrap gap-0.5">
                <DetailsItem>
                  {ticketDetails?.details?.bus_name}
                  {ticketDetails?.details?.bus_number}
                </DetailsItem>
              </div>

              {!!ticketDetails?.details?.bus_pictures?.length && (
                <SwiperImages
                  items={toArray(ticketDetails?.details?.bus_pictures)?.map((el, i) => ({
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
