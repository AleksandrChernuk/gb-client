/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTotalPriceFromPassengers } from '@/features/checkout-form/helpers';
import { getFreeSeatData } from '@/features/checkout-form/lib/normalize/getFreeSeatData';
import { TNormalizeParams } from '@/features/checkout-form/types/normalize.request.form.types';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import { IFreeSeats } from '@/shared/types/free.seats.interface';
import { IRequestOrder, RequestTicket } from '@/shared/types/order-interface';
import { TPaidBaggage } from '@/shared/types/paid.baggage.types';
import { IChangeStations } from '@/shared/types/route.change.stations.interface';
import { IRouteResponse } from '@/shared/types/route.types';

//totalPrice - самому посчитать общую суму токобасу со скидками
//totalPrice?:number - передавать токобасу общую сумму со скидками и передавать на оформление ордера

//passengers?: number;- для поиска маршрутов,
//забблокировать токобас - для видачі в поиск "TOCOBUS"
//в роут инфо записсиваеться перессадка

function extractSeatsForChangeStations(
  changeStations: IChangeStations[],
  passengerIndex: number,
): { seatId: string; seatNumber: string } {
  const seatIds: string[] = [];
  const seatNumbers: string[] = [];

  for (const station of changeStations) {
    const freeSeats = station.freeSeats;
    if (!Array.isArray(freeSeats)) continue;

    const freeSeatItem = freeSeats[passengerIndex];
    const { seatId, seatNumber } = getFreeSeatData(freeSeatItem);
    seatIds.push(seatId);
    seatNumbers.push(seatNumber);
  }

  return {
    seatId: seatIds.join(','),
    seatNumber: seatNumbers.join(','),
  };
}

function extractSeatInfo(
  route: IRouteResponse,
  freeSeats: IFreeSeats[] | (number | string)[] | null | undefined,
  selectedSeats: { seatId?: string; seatNumber?: string }[] | undefined,
  passengerIndex: number,
): { seatId: string; seatNumber: string } {
  if (Array.isArray(route.changeStations) && route.changeStations.length > 0) {
    return extractSeatsForChangeStations(route.changeStations, passengerIndex);
  }

  const selectedSeat = selectedSeats?.[passengerIndex];
  if (selectedSeat && (selectedSeat.seatId || selectedSeat.seatNumber)) {
    return {
      seatId: selectedSeat.seatId ?? '',
      seatNumber: selectedSeat.seatNumber ?? '',
    };
  }

  if (Array.isArray(freeSeats) && passengerIndex < freeSeats.length) {
    const freeSeatItem = freeSeats[passengerIndex];
    return getFreeSeatData(freeSeatItem);
  }

  return { seatId: '', seatNumber: '' };
}

export const normalizeData = ({
  fromCityId,
  toCityId,
  locale,
  formData,
  user,
  route,
}: TNormalizeParams): IRequestOrder => {
  const details = route.details;
  const freeSeats = details?.freeSeatsMap;
  const discounts = Array.isArray(details?.discounts) ? details.discounts : [];
  const isTranstempo = route.providerName.toLowerCase() === 'transtempo';

  const totalPrice = getTotalPriceFromPassengers(formData.passengers);

  const tickets: RequestTicket[] = formData.passengers.map((passenger, idx) => {
    const { seatId, seatNumber } = extractSeatInfo(route, freeSeats, formData.selectedSeats, idx);

    const paidBaggage =
      Array.isArray(passenger.paidBaggage) && passenger.paidBaggage.length > 0
        ? passenger.paidBaggage.map((b: TPaidBaggage) => ({
            baggageId: String(b.baggageId),
            baggageTitle: String(b.baggageTitle),
            length: String(b.length ?? ''),
            width: String(b.width ?? ''),
            height: String(b.height ?? ''),
            kg: String(b.kg ?? ''),
            typ: b.typ ?? undefined,
            price: Number(b.price ?? 0),
            currency: b.currency ?? 'UAH',
          }))
        : undefined;

    const ticket: RequestTicket = {
      firstName: passenger.firstName,
      lastName: passenger.lastName,
      ...(passenger.documentType && { documentType: passenger.documentType }),
      ...(passenger.middlename && { middlename: passenger.middlename }),
      ...(passenger.bday && { birthdate: passenger.bday }),
      ...(passenger.documentNumber && { documentNumber: passenger.documentNumber }),
      ...(passenger.gender && { gender: passenger.gender }),
      ...(passenger.citizenship && { citizenship: passenger.citizenship }),
      phone: formData.phone,
      email: formData.email,
      seatId,
      seatNumber,
      withFees: true,
      ...(paidBaggage && { paidBaggage }),
    };

    const addDiscount = (discount: any) => {
      if (!discount) return;
      if (discount.id != null) ticket.discountId = String(discount.id);
      if (discount.description) ticket.discountDescription = discount.description;
      if (typeof discount.percent === 'number') ticket.discountPercent = discount.percent;
    };

    if (isTranstempo && discounts.length > 0) {
      if (passenger.discount) {
        addDiscount({
          id: passenger.discount,
          description: passenger.discountDescription,
          percent: Number(passenger.discountPercent),
        });
      } else {
        addDiscount(discounts[0]);
      }
    } else {
      if (passenger.discount) ticket.discountId = String(passenger.discount);
      if (passenger.discountDescription) ticket.discountDescription = passenger.discountDescription;
      if (passenger.discountPercent) ticket.discountPercent = Number(passenger.discountPercent);
    }

    return ticket;
  });

  const departure = extractLocationDetails(route.departure.fromLocation, locale);
  const arrival = extractLocationDetails(route.arrival.toLocation, locale);

  return {
    providerId: route.identificators.providerId,
    ...(route.identificators.routeId && { routeId: route.identificators.routeId }),
    ...(route.identificators.rideId && { rideId: route.identificators.rideId }),
    ...(route.identificators.tripId && { tripId: route.identificators.tripId }),
    ...(route.identificators.timetableId && { timetableId: route.identificators.timetableId }),
    ...(route.identificators.intervalId && { intervalId: route.identificators.intervalId }),
    ...(route.identificators.busId && { busId: route.identificators.busId }),
    ...(route.identificators.routeName && { routeName: route.identificators.routeName }),
    ...(route.providerName.toLowerCase() === 'klr' && { busId: `${route.details?.transportId}` }),
    canPaymentToDriver: !!route.allowedOperations.canPaymentToDriver,
    ...(typeof route.identificators.metadata === 'object' &&
      route.identificators.metadata !== null && { metadata: route.identificators.metadata }),

    fromCityId,
    fromCityName: departure.locationName,
    fromCountry: departure.countryName,
    fromTimezone: route.departure.fromLocation.timezone.zoneName,
    fromStationId: `${route.departure.stationId ?? 0}`,
    fromStationName: `${route.departure.stationName}`,
    ...(route.departure.stationAddress && { fromStationAddress: route.departure.stationAddress }),
    ...(route.departure.stationCoordsLat && { fromStationLat: Number(route.departure.stationCoordsLat) }),
    ...(route.departure.stationCoordsLon && { fromStationLon: Number(route.departure.stationCoordsLon) }),

    toCityId,
    toCityName: arrival.locationName,
    toCountry: arrival.countryName,
    toStationId: `${route.arrival.stationId ?? 0}`,
    toStationName: `${route.arrival.stationName}`,
    toTimezone: route.arrival.toLocation.timezone.zoneName,
    ...(route.arrival.stationAddress && { toStationAddress: route.arrival.stationAddress }),
    ...(route.arrival.stationCoordsLat && { toStationLat: Number(route.arrival.stationCoordsLat) }),
    ...(route.arrival.stationCoordsLon && { toStationLon: Number(route.arrival.stationCoordsLon) }),

    departureDateTime: route.departure.dateTime ?? '',
    arrivalDateTime: route.arrival.dateTime ?? '',
    ...(route.duration && { duration: route.duration }),
    ...(route.identificators.bustypeId && { bustypeId: route.identificators.bustypeId }),
    ...(route.carrier.id && { carrierId: `${route.carrier.id}` }),
    ...(route.carrier.name && { carrierName: route.carrier.name }),
    ...(details?.automaticDiscountId && { automaticDiscountId: details.automaticDiscountId }),
    ...(details?.returnRulesDescription && { refundRules: details.returnRulesDescription }),
    ...(details?.luggageRules && { baggageRules: details.luggageRules }),

    eTicket: !!route.eTicket,
    refundOnlyOrder: route.refundOnlyOrder,
    ticketChange: !!route.ticketChange,
    tripType: 'oneway',
    orderType: formData.payment,
    currency: 'UAH',
    locale,
    customerTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    ...(user?.id && { userId: user.id }),
    ...(tickets[0]?.firstName && { customerFirstName: tickets[0].firstName }),
    ...(tickets[0]?.lastName && { customerLastName: tickets[0].lastName }),
    customerEmail: formData.email,
    customerPhone: formData.phone,
    ...(route.providerName === 'TOCOBUS' && { totalPrice }),
    tickets,
  };
};
