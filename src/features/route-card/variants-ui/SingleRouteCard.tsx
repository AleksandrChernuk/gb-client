'use client';

import { useState, useTransition } from 'react';
import { IRouteResponse } from '@/shared/types/route.types';
import { useLocale, useTranslations } from 'next-intl';

import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import RouteCardWrapper from '@/entities/route/RouteCard';
import SelectButton from '@/entities/route/RouteSelectButton';
import CarrierLabel from '@/shared/ui/RouteCarrierLabel';
import { usePricing } from '@/features/route-card/hooks/usePricing';
import { useRouteDetails } from '@/features/route-card/hooks/useRouteDetails';
import { updateRouteDetails } from '@/features/route-card/helpers/updateRouteDetails';
import { RoteFreeSeats } from '@/features/route-card/base-ui/RoteFreeSeats';
import { useSelectTicket } from '@/features/route-card/hooks/useSelectTicket';
import RouteDetailsToggle from '@/entities/route/RouteDetailsToggle';
import { MobileDetailsPrice } from '@/features/route-card/base-ui/MobileDetailsPrice';
import { RoutePricing } from '@/features/route-card/base-ui/RoutePricing';
import { useRouterSearch } from '@/shared/hooks/useRouterSearch';
import TicketCardRoute from '@/features/route-card/base-ui/TicketCardRoute';
import MobileDetails from '@/features/route-card/details-ui/RouteMobileDetails';
import RouteCardDetails from '@/features/route-card/details-ui/RouteCardDetails';

type Props = {
  data: IRouteResponse;
  disabled?: boolean;
};

export const SingleRouteCard = ({ data: element, disabled }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState<boolean>(false);

  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);
  const locale = useLocale();

  const [params] = useRouterSearch();

  const setSelectedTicket = useSelectTicket();

  const { details, isLoading, fetchDetails, hasDetails } = useRouteDetails({
    ticketId: element.ticketId,
    providerName: element.providerName,
    params: {
      route: element,
      fromCityId: element.departure.fromLocation.id ?? 0,
      toCityId: element.arrival.toLocation.id ?? 0,
      locale: locale,
      passCount: params.voyagers,
      travelDate: element.departure.dateTime ?? '',
    },
  });

  const voyagersCount = Number(params.voyagers ?? 0);
  const freeSeats = Number(element.seats.freeSeats ?? 0);

  const isSoldOutForPassengers = voyagersCount > freeSeats;

  const { singlePrice, totalPrice } = usePricing(element.ticketPricing.basePrice ?? 0, params.voyagers);

  const updatedRoute = updateRouteDetails(element, details);

  const SelectButtonComponent = ({ variant }: { variant: 'mobile' | 'desktop' | 'details' }) => (
    <SelectButton
      price={singlePrice}
      variant={variant}
      loading={loading}
      disabled={isSoldOutForPassengers || loading || disabled}
      buttonText={t('selectButton')}
      onClick={() => {
        if (isSoldOutForPassengers) return;

        if (isPending) return;
        setLoading(true);

        startTransition(async () => {
          await setSelectedTicket(element, {
            route: element,
            fromCityId: element.departure.fromLocation.id ?? 0,
            toCityId: element.arrival.toLocation.id ?? 0,
            locale: locale,
            passCount: params.voyagers,
            travelDate: element.departure.dateTime ?? '',
          });
        });
      }}
    />
  );

  const RouteCardDetailsComponent = () => (
    <RouteCardDetails
      departure={{
        dateTime: updatedRoute.departure.dateTime,
        stationAddress: updatedRoute.departure.stationAddress,
        stationName: updatedRoute.departure.stationName,
        location: updatedRoute.departure.fromLocation,
      }}
      arrival={{
        dateTime: updatedRoute.arrival.dateTime,
        stationAddress: updatedRoute.arrival.stationAddress,
        stationName: updatedRoute.arrival.stationName,
        location: updatedRoute.arrival.toLocation,
      }}
      routeDetails={{
        duration: updatedRoute.duration,
        stops: updatedRoute.details?.stops,
        luggageRules: updatedRoute.details?.luggageRules,
        returnRulesDescription: updatedRoute.details?.returnRulesDescription,
        returnRules: updatedRoute.details?.returnRules,
        discounts: updatedRoute.details?.discounts,
        routeInfo: updatedRoute.details?.routeInfo,
        amenities: updatedRoute.details?.amenities,
      }}
      bus={{
        name: updatedRoute.details?.busName,
        number: updatedRoute.details?.busNumber,
        pictures: updatedRoute.details?.busPictures,
      }}
      loading={isLoading}
    />
  );

  return (
    <RouteCardWrapper
      selectButton={<SelectButtonComponent variant="mobile" />}
      providerName={element.providerName}
      canPaymentToDriver={!!element.allowedOperations.canPaymentToDriver}
    >
      <div className="flex flex-row items-center justify-between gap-1 tablet:gap-2">
        <TicketCardRoute route={element} />

        <div className="flex-col items-center hidden gap-2 tablet:flex tablet:gap-4">
          <RoutePricing price={singlePrice} currency={element.ticketPricing.currency} />
          <SelectButtonComponent variant="desktop" />
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#e6e6e6] dark:bg-slate-700 rounded-2xl relative my-4" />

      <div className="relative grid grid-cols-2 tablet:grid-cols-[1fr_1fr_1fr] items-center gap-2">
        <CarrierLabel carrierName={element.carrier.name || 'Deafault'} />

        <RoteFreeSeats
          title={`${t('places')}`}
          seats={element.seats.freeSeats ?? 0}
          outForPassengers={isSoldOutForPassengers}
        />

        <div className="items-center justify-center hidden tablet:flex tablet:order-2 tablet:justify-self-center">
          <RouteDetailsToggle
            isOpen={isOpen}
            disabled={loading}
            toggleOpen={() => {
              if (loading) return;
              setIsOpen((p) => !p);
              fetchDetails();
            }}
          />
        </div>

        <div className="flex items-center justify-center ml-auto tablet:hidden">
          <MobileDetails
            carrierName={element.carrier.name || 'Deafault'}
            disabledTrigger={loading}
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
                passengerCount={params.voyagers}
                selectButton={<SelectButtonComponent variant="details" />}
              />
            }
          >
            <RouteCardDetailsComponent />
          </MobileDetails>
        </div>
      </div>

      <div
        className={`hidden tablet:block overflow-hidden transition-all duration-100 ${
          isOpen ? 'max-h-[4000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {isOpen && <RouteCardDetailsComponent />}
      </div>
    </RouteCardWrapper>
  );
};
