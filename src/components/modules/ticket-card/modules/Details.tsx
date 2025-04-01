import { useCurrentTicketStore } from '@/store/useCurrentTicket';
import { useLocale, useTranslations } from 'next-intl';
import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { format } from 'date-fns';
import { ChevronRight, Clock3, Route } from 'lucide-react';
import DetailsStops from '../components/DetailsStops';
import Image from 'next/image';
import { IconLoader } from '@/components/icons/IconLoader';

type Props = {
  id: string;
};

export default function Details({ id }: Props) {
  const currentLocale = useLocale();
  const t = useTranslations('search');

  console.log(id);

  const ticketDetails = useCurrentTicketStore((state) => state.tickets[id]);

  const loadingDetails = useCurrentTicketStore((state) => state.loadingTickets);

  const isLoading = loadingDetails[id];

  return isLoading ? (
    <div className="flex items-center justify-center gap-1 body_medium text-text_prymery tablet:min-w-[397px] mt-8">
      <IconLoader />
    </div>
  ) : (
    <div className="tablet:grid tablet:grid-cols-2 tablet:gap-2 tablet:mt-8 space-y-4 tablet:space-y-0">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="gap-2 flex_center">
            <h5 className="h6 text-text_prymery">{t('route')}:</h5>
            <div className="flex_center gap-2 text-primary_1 text-text-text_secondary text-[10px] mobile:small_text">
              {` ${format(ticketDetails?.departure.date_time || new Date(), 'EEE dd')}, 
                    ${ticketDetails && extractLocationDetails(ticketDetails?.departure.fromLocation, currentLocale).locationName}`}
              <ChevronRight size={16} className="stroke-primary_1" />
              {` ${format(ticketDetails?.arrival.date_time || new Date(), 'EEE dd')}, 
                   ${ticketDetails && extractLocationDetails(ticketDetails?.arrival.toLocation, currentLocale).locationName}`}
            </div>
          </div>

          <div className="gap-2 flex_center text-text_secondary text-[10px] mobile:small_text">
            <Route className="rotate-90 stroke-gray_2_for_body dark:stroke-gray_1" size={16} />
            <span>{t('travel_time')}:</span>
          </div>

          <div className="gap-2 flex_center ">
            <Clock3 className="stroke-gray_2_for_body dark:stroke-gray_1" size={16} />
            <p className="text-wrap text-text_secondary  text-[10px] mobile:small_text">{t('local_time')}</p>
          </div>
        </div>

        <DetailsStops id={id}  />
      </div>

      <div className="space-y-4">
        {ticketDetails?.details?.luggage_rules && !!ticketDetails?.details?.luggage_rules.length && (
          <div className={`space-y-1`}>
            <h5 className="h6 text-text_prymery">{t('luggage')}:</h5>
            <ul className="flex flex-col gap-1">
              {ticketDetails?.details?.luggage_rules.map((el) => (
                <li key={el} className="text-wrap text-text_secondary text-[10px] mobile:small_text">
                  {el}
                </li>
              ))}
            </ul>
          </div>
        )}

        {ticketDetails?.details?.return_rules_description &&
          !!ticketDetails?.details?.return_rules_description.length && (
            <div className={`space-y-1`}>
              <h5 className="h6 text-text_prymery">{t('return_policy')}:</h5>
              <ul>
                {ticketDetails?.details?.return_rules_description.map((el) => (
                  <li className="text-wrap text-text_secondary text-[10px] mobile:small_text" key={el}>
                    {el}
                  </li>
                ))}
              </ul>
            </div>
          )}

        {ticketDetails?.details?.amenities && !!ticketDetails?.details?.amenities.length && (
          <div className={`space-y-1`}>
            <h5 className="h6 text-text_prymery">{t('amenities')}:</h5>
            <ul className="flex flex-row flex-wrap gap-2">
              {ticketDetails?.details?.amenities.map((el) => (
                <li key={el} className="text-wrap text-text_secondary  text-[10px] mobile:small_text">
                  {el}
                </li>
              ))}
            </ul>
          </div>
        )}

        {ticketDetails?.details?.discounts && !!ticketDetails?.details?.discounts.length && (
          <div className={`space-y-1`}>
            <h5 className="h6 text-text_prymery">{t('discounts')}:</h5>
            <ul className="flex flex-row flex-wrap gap-0.5">
              {ticketDetails?.details?.discounts.map((el) => (
                <li key={el.id} className="text-wrap text-text_secondary  text-[10px] mobile:small_text">
                  {el.description || el.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {ticketDetails?.details && Boolean(ticketDetails?.details?.bus_name) && (
          <div className={`space-y-1`}>
            <h5 className="h6 text-text_prymery">{t('bus')}:</h5>
            <div className="flex flex-row flex-wrap gap-0.5">
              <p className="text-wrap text-text_secondary text-[10px] mobile:small_text">
                {ticketDetails?.details?.bus_name}
                {ticketDetails?.details?.bus_number}
              </p>
            </div>

            <div>
              {ticketDetails?.details?.bus_pictures?.map(
                (el) => el && <Image key={el} src={el} alt="bus" width={100} height={100} />,
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
