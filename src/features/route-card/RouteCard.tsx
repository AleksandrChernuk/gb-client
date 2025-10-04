'use client';

import { useState } from 'react';
import { IRouteResponse } from '@/shared/types/route.types';
import { useLocale, useTranslations } from 'next-intl';
import MobileDetails from './ui/RouteMobileDetails';
import Details from './ui/RouteCardDetails';
import { useShallow } from 'zustand/react/shallow';
import { useSearchStore } from '@/shared/store/useSearch';
import TicketRoute from './ui/TicketCardRoute';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import RouteCardWrapper from '@/entities/route/RouteCard';
import SelectButton from '@/entities/route/RouteSelectButton';
import CarrierLabel from '@/shared/ui/RouteCarrierLabel';
import { usePricing } from '@/features/route-card/hooks/usePricing';
import { useRouteDetails } from '@/features/route-card/hooks/useRouteDetails';
import { updateRouteDetails } from '@/features/route-card/helpers/updateRouteDetails';
import { RoteFreeSeats } from '@/features/route-card/ui/RoteFreeSeats';
import { useSelectTicket } from '@/features/route-card/hooks/useSelectTicket';
import { useSelectedTickets } from '@/shared/store/useSelectedTickets';
import RouteDetailsToggle from '@/entities/route/RouteDetailsToggle';
import { MobileDetailsPrice } from '@/features/route-card/ui/MobileDetailsPrice';
import { RoutePricing } from '@/features/route-card/ui/RoutePricing';

type Props = {
  element: IRouteResponse;
  disabled?: boolean;
};

export const RouteCard = ({ element }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);
  const locale = useLocale();
  const [adult, children] = useSearchStore(useShallow((state) => [state.adult, state.children]));

  const setSelectedTicket = useSelectTicket();
  const { loadingTicketId } = useSelectedTickets();
  const isLoadingCurrent = loadingTicketId === element.ticketId;

  const { details, isLoading, fetchDetails, hasDetails } = useRouteDetails({
    ticketId: element.ticketId,
    providerName: element.providerName,
    params: {
      route: element,
      fromCityId: element.departure.fromLocation.id ?? 0,
      toCityId: element.arrival.toLocation.id ?? 0,
      locale: locale,
      passCount: adult + children,
      travelDate: element.departure.dateTime ?? '',
    },
  });

  const { singlePrice, totalPrice } = usePricing(element.ticketPricing.basePrice ?? 0, adult, children);

  const SelectButtonComponent = ({ variant }: { variant: 'mobile' | 'desktop' | 'details' }) => (
    <SelectButton
      price={singlePrice}
      variant={variant}
      loading={isLoadingCurrent}
      disabled={isLoadingCurrent}
      buttonText={t('selectButton')}
      onClick={() => {
        if (isLoadingCurrent) return;
        setSelectedTicket(element, {
          route: element,
          fromCityId: element.departure.stationId ?? 0,
          toCityId: element.arrival.stationId ?? 0,
          locale: 'uk',
          passCount: adult + children,
          travelDate: element.departure.dateTime ?? '',
        });
      }}
    />
  );

  return (
    <RouteCardWrapper
      selectButton={<SelectButtonComponent variant="mobile" />}
      providerName={element.providerName}
      canPaymentToDriver={!!element.allowedOperations.canPaymentToDriver}
    >
      <div className="flex flex-row items-center justify-between gap-1 tablet:gap-2">
        <TicketRoute route={element} />

        <div className="flex-col items-center hidden gap-2 tablet:flex tablet:gap-4">
          <RoutePricing price={singlePrice} currency={element.ticketPricing.currency} />
          <SelectButtonComponent variant="desktop" />
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#e6e6e6] dark:bg-slate-700 rounded-2xl relative my-4" />

      <div className="relative grid grid-cols-2 tablet:grid-cols-[1fr_1fr_1fr] items-center gap-2">
        <CarrierLabel carrierName={element.carrier.name || 'Deafault'} />

        <RoteFreeSeats title={`${t('places')}:`} seats={element.seats.freeSeats ?? 0} />

        <div className="items-center justify-center hidden tablet:flex tablet:order-2 tablet:justify-self-center">
          <RouteDetailsToggle
            isOpen={isOpen}
            toggleOpen={() => {
              setIsOpen((p) => !p);
              fetchDetails();
            }}
          />
        </div>

        <div className="flex items-center justify-center ml-auto tablet:hidden">
          <MobileDetails
            onClickTrigger={() => {
              if (!hasDetails) {
                fetchDetails();
              }
            }}
            detailsFooter={
              <MobileDetailsPrice
                price={totalPrice}
                currency={element.ticketPricing.currency}
                placeholderPassenger={t('placeholderPassenger')}
                passengerCount={adult + children}
                selectButton={<SelectButtonComponent variant="details" />}
              />
            }
          >
            <Details route={updateRouteDetails(element, details)} loading={isLoading} />
          </MobileDetails>
        </div>
      </div>
      <div
        className={`hidden tablet:block overflow-hidden transition-all duration-100 ${
          isOpen ? 'max-h-[4000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {isOpen && <Details route={updateRouteDetails(element, details)} loading={isLoading} />}
      </div>
    </RouteCardWrapper>
  );
};
