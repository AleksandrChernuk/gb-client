'use client';

import { IRouteResponse } from '@/types/route.types';
import { IconLoader } from '@/components/icons/IconLoader';
import MobileDetails from '../MobileDetails';
import TicketDetails from './TicketDetails';
import { useLocale, useTranslations } from 'next-intl';
import TicketRouteMobile from '@/components/shared/TicketRouteMobile';
import TicketRouteDesctop from './TicketRouteDesctop';
import TicketPricingDesctop from './TicketPricingDesctop';
import TicketDivider from './TicketDivider';
import TicketPricingMobile from './TicketPricingMobile';
import useTicketCard from '../../hooks/useTicketCard';
import { TicketCarriers } from './TicketCarriers';
import TicketDetailsButton from '../TicketDetailsButton';
import { useCurrentTicketStore } from '@/store/useCurrentTicket';
import TicketPlaces from './TicketPlaces';
import { useState } from 'react';
import { motion } from 'motion/react';
import { TicketDetailsProvider } from '../../context/TicketDetailsContext';

type Props = {
  element: IRouteResponse;
  disabled?: boolean;
};

export const TicketCard = ({ element }: Props) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { handleGetDetails, handleSetTicket } = useTicketCard();

  const selectedTicketId = useCurrentTicketStore((state) => state.selectedTicketId);
  const tickets = useCurrentTicketStore((state) => state.tickets);

  const setSelectedTicketId = useCurrentTicketStore((state) => state.setSelectedTicketId);

  const loadingDetails = useCurrentTicketStore((state) => state.loadingTickets);
  const hasDetails = tickets[element.ticket_id]?.details != null;

  const currentLocale = useLocale();
  const t = useTranslations('search');

  const isLoading = loadingDetails[element.ticket_id];
  const isDisabled: boolean = selectedTicketId !== null && selectedTicketId !== element.ticket_id;
  return (
    <div className="relative shadow tablet:shadow-none rounded-t-2xl tablet:rounded-none">
      <TicketDetailsProvider id={element.ticket_id}>
        <div className="p-4 shadow-none tablet:p-6 bg-card_bg_primery rounded-t-2xl tablet:rounded-2xl tablet:shadow">
          <div className="flex flex-row items-center justify-between gap-1 tablet:gap-2">
            <TicketRouteMobile locale={currentLocale} route={element} />
            <TicketRouteDesctop locale={currentLocale} route={element} />

            <TicketPricingDesctop
              loading={loading}
              disabled={isDisabled}
              handleSelect={async () => {
                setLoading(true);
                setSelectedTicketId(element.ticket_id);
                await handleSetTicket(element);
              }}
              price={`${Math.floor(element.ticket_pricing.base_price || 0)}`}
            />
          </div>

          <TicketDivider />

          <div className="relative grid grid-cols-2 tablet:grid-cols-[1fr_1fr_1fr] items-center gap-2">
            <TicketCarriers name={element.carrier.name || ''} />

            <TicketPlaces count={element.seats.free_seats || 0} />

            <TicketDetailsButton
              isOpen={isOpen}
              onClick={() => {
                setIsOpen((p) => !p);
                if (!hasDetails) {
                  handleGetDetails(element);
                }
              }}
              text={!isOpen ? t('details') : t('collapse_details')}
            />

            <div className="flex items-center justify-center ml-auto tablet:hidden">
              <MobileDetails onClick={() => {}} />
            </div>
          </div>

          <motion.div
            initial={{ height: 0 }}
            animate={{ height: isOpen ? 'auto' : 0 }}
            transition={{ duration: 0.1 }}
            style={{ overflow: 'hidden' }}
            className={'hidden tablet:block'}
          >
            {isOpen && (
              <div>
                {isLoading ? (
                  <div className="flex  items-center justify-center gap-1 body_medium text-text_prymery tablet:min-w-[397px] mt-8">
                    <IconLoader />
                  </div>
                ) : (
                  <TicketDetails />
                )}
              </div>
            )}
          </motion.div>
        </div>

        <TicketPricingMobile
          loading={loading}
          disabled={false}
          handleSelect={async () => {
            setLoading(true);
            setSelectedTicketId(element.identificators.route_id);
            await handleSetTicket(element);
          }}
          price={`${Math.floor(element.ticket_pricing.base_price || 0)}`}
        />
      </TicketDetailsProvider>
    </div>
  );
};
