import { useCurrentTicket } from '@/store/useCurrentTicket';
import { useLocale, useTranslations } from 'next-intl';
import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { format } from 'date-fns';
import { ChevronRight, Clock3, Route } from 'lucide-react';
import DetailsStops from '../components/DetailsStops';
import Image from 'next/image';
import { IconLoader } from '@/components/icons/IconLoader';
import { MESSAGE_FILES } from '@/constans/message.file.constans';

type Props = {
  id: string;
};

export default function Details({ id }: Props) {
  const currentLocale = useLocale();
  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);

  const ticketDetails = useCurrentTicket((state) => state.tickets[id]);

  const loadingDetails = useCurrentTicket((state) => state.loadingTickets);

  const isLoading = loadingDetails[id];

  return isLoading ? (
    <div className="flex items-center justify-center gap-1 text-base font-medium tracking-normal leading-[24px] text-slate-700 dark:text-slate-50 tablet:min-w-[397px] mt-8">
      <IconLoader />
    </div>
  ) : (
    <div className="space-y-4 tablet:grid tablet:grid-cols-2 tablet:gap-2 tablet:mt-8 tablet:space-y-0">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h5 className="text-sm font-bold tracking-normal leading-[18px] text-slate-700 dark:text-slate-50">
              {t('route')}:
            </h5>
            <div className="flex items-center gap-2  text-slate-400 dark:text-slate-200 text-[10px] mobile:text-xs mobile:font-normal mobile:tracking-normal mobile:leading-[18px]">
              {` ${format(ticketDetails?.departure.date_time || new Date(), 'EEE dd')}, 
                    ${ticketDetails && extractLocationDetails(ticketDetails?.departure.fromLocation, currentLocale).locationName}`}
              <ChevronRight size={16} className="stroke-green-300" />
              {` ${format(ticketDetails?.arrival.date_time || new Date(), 'EEE dd')}, 
                   ${ticketDetails && extractLocationDetails(ticketDetails?.arrival.toLocation, currentLocale).locationName}`}
            </div>
          </div>

          <div className="gap-2 flex items-center text-slate-400 dark:text-slate-200 text-[10px] mobile:text-xs mobile:font-normal mobile:tracking-normal mobile:leading-[18px]">
            <Route className="rotate-90 stroke-[#6f8b90] dark:stroke-slate-200" size={16} />
            <span>{t('travel_time')}:</span>
          </div>

          <div className="flex items-center gap-2 ">
            <Clock3 className="stroke-[#6f8b90] dark:stroke-slate-200" size={16} />
            <p className="text-wrap text-slate-400 dark:text-slate-200  text-[10px] mobile:text-xs mobile:font-normal mobile:tracking-normal mobile:leading-[18px]">
              {t('local_time')}
            </p>
          </div>
        </div>

        <DetailsStops id={id} />
      </div>

      <div className="space-y-4">
        {ticketDetails?.details?.luggage_rules && !!ticketDetails?.details?.luggage_rules.length && (
          <div className={`space-y-1`}>
            <h5 className="text-sm font-bold tracking-normal leading-[18px] text-slate-700 dark:text-slate-50">
              {t('luggage')}:
            </h5>
            <ul className="flex flex-col gap-1">
              {Array.isArray(ticketDetails?.details?.luggage_rules) &&
                ticketDetails?.details?.luggage_rules.map((el) => (
                  <li
                    key={el}
                    className="text-wrap text-slate-400 dark:text-slate-200 text-[10px] mobile:text-xs mobile:font-normal mobile:tracking-normal mobile:leading-[18px]"
                  >
                    {el}
                  </li>
                ))}
            </ul>
          </div>
        )}

        {ticketDetails?.details?.return_rules_description &&
          !!ticketDetails?.details?.return_rules_description.length && (
            <div className={`space-y-1`}>
              <h5 className="text-sm font-bold tracking-normal leading-[18px] text-slate-700 dark:text-slate-50">
                {t('return_policy')}:
              </h5>
              <ul>
                {ticketDetails?.details?.return_rules_description.map((el) => (
                  <li
                    className="text-wrap text-slate-400 dark:text-slate-200 text-[10px] mobile:text-xs mobile:font-normal mobile:tracking-normal mobile:leading-[18px]"
                    key={el}
                  >
                    {el}
                  </li>
                ))}
              </ul>
            </div>
          )}

        {ticketDetails?.details?.amenities && !!ticketDetails?.details?.amenities.length && (
          <div className={`space-y-1`}>
            <h5 className="text-sm font-bold tracking-normal leading-[18px] text-slate-700 dark:text-slate-50">
              {t('amenities')}:
            </h5>
            <ul className="flex flex-row flex-wrap gap-2">
              {ticketDetails?.details?.amenities.map((el) => (
                <li
                  key={el}
                  className="text-wrap text-slate-400 dark:text-slate-200  text-[10px] mobile:text-xs mobile:font-normal mobile:tracking-normal mobile:leading-[18px]"
                >
                  {el}
                </li>
              ))}
            </ul>
          </div>
        )}

        {ticketDetails?.details?.discounts && !!ticketDetails?.details?.discounts.length && (
          <div className={`space-y-1`}>
            <h5 className="text-sm font-bold tracking-normal leading-[18px] text-slate-700 dark:text-slate-50">
              {t('discounts')}:
            </h5>
            <ul className="flex flex-row flex-wrap gap-0.5">
              {ticketDetails?.details?.discounts.map((el) => (
                <li
                  key={el.id}
                  className="text-wrap text-slate-400 dark:text-slate-200  text-[10px] mobile:text-xs mobile:font-normal mobile:tracking-normal mobile:leading-[18px]"
                >
                  {el.description || el.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {ticketDetails?.details && Boolean(ticketDetails?.details?.bus_name) && (
          <div className={`space-y-1`}>
            <h5 className="text-sm font-bold tracking-normal leading-[18px] text-slate-700 dark:text-slate-50">
              {t('bus')}:
            </h5>
            <div className="flex flex-row flex-wrap gap-0.5">
              <p className="text-wrap text-slate-400 dark:text-slate-200 text-[10px] mobile:text-xs mobile:font-normal mobile:tracking-normal mobile:leading-[18px]">
                {ticketDetails?.details?.bus_name}
                {ticketDetails?.details?.bus_number}
              </p>
            </div>

            <div>
              {ticketDetails?.details?.bus_pictures?.map(
                (el) => el && <Image draggable={false} key={el} src={el} alt="bus" width={100} height={100} />,
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
