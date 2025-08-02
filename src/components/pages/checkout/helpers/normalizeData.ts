/* eslint-disable @typescript-eslint/no-explicit-any */
import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { ICurrentUser } from '@/store/useUser/types';
import { IRequestOrder } from '@/types/order-interface';
import { IRouteResponse } from '@/types/route.types';

type NormalizeDataParams = {
  fromCityId: number;
  toCityId: number;
  locale: string;
  formData: any;
  user: ICurrentUser | null;
  route: IRouteResponse;
};

const normalizeData = ({ fromCityId, toCityId, locale, formData, user, route }: NormalizeDataParams): IRequestOrder => {
  const details = route.details;

  const tickets = formData.passengers.map((p: any, idx: string | number) => {
    const discountId =
      p.discount ?? (route.providerName === 'TRANSTEMPO' ? route.details?.discounts?.[0]?.id : undefined);

    const data = {
      firstName: p.firstName,
      lastName: p.lastName,
      ...(p.middlename && { middlename: p.middlename }),
      ...(details?.needBirth && p.bday ? { birthdate: p.bday } : {}),
      ...(p.documentType && { documentType: p.documentType }),
      ...(p.documentNumber && { documentNumber: p.documentNumber }),
      ...(p.gender && { gender: p.gender }),
      ...(p.citizenship && { citizenship: p.citizenship }),
      phone: formData.phone,
      email: formData.email,
      seatId: formData.selectedSeats?.[idx]?.seatId ?? route.details?.freeSeatsMap?.[Number(idx)]?.seatId ?? '',
      seatNumber:
        formData.selectedSeats?.[idx]?.seatNumber ?? route.details?.freeSeatsMap?.[Number(idx)]?.seatNumber ?? '',
      ...(discountId ? { discountId } : {}),
      ...(p.discountDescription ? { discountDescription: p.discountDescription } : {}),
      ...(p.discountPercent ? { discountPercent: Number(p.discountPercent) } : {}),

      withFees: true,
      buggageCount: 1,
    };

    return data;
  });

  return {
    providerId: route.identificators.providerId,
    ...(!!route.identificators.routeId && { routeId: route.identificators.routeId }),
    ...(!!route.identificators.rideId && { rideId: route.identificators.rideId }),
    ...(!!route.identificators.tripId && { tripId: route.identificators.tripId }),
    ...(!!route.identificators.intervalId && { intervalId: route.identificators.intervalId }),
    ...(!!route.identificators.busId && {
      busId: route.identificators.busId,
    }),
    ...(route?.providerName === 'KLR' && {
      busId: `${route?.details?.transportId}`,
    }),
    ...(!!route.identificators.routeName && { routeName: route.identificators.routeName }),
    canPaymentToDriver: !!route.allowedOperations.canPaymentToDriver,
    ...(typeof route.identificators.metadata === 'object' && route.identificators.metadata !== null
      ? { metadata: route.identificators.metadata }
      : {}),
    fromCityId: fromCityId,
    eTicket: !!route.eTicket,
    fromCityName: extractLocationDetails(route.departure.fromLocation, locale).locationName,
    fromCountry: extractLocationDetails(route.departure.fromLocation, locale).countryName,
    fromTimezone: route.departure.fromLocation.timezone.zoneName,
    toCityId: toCityId,
    toCityName: extractLocationDetails(route.arrival.toLocation, locale).locationName,
    fromStationId: `${route.departure.stationId}`,
    fromStationName: `${route.departure.stationName}`,
    ...(!!route.details?.returnRulesDescription && { refundRules: route.details?.returnRulesDescription }),
    ...(!!route?.departure.stationAddress && { fromStationAddress: route.departure.stationAddress }),
    ...(!!route?.arrival.stationAddress && { toStationAddress: route.arrival.stationAddress }),
    ...(!!route.departure.stationCoordsLat && { fromStationLat: Number(route.departure.stationCoordsLat) }),
    ...(!!route.departure.stationCoordsLon && { fromStationLon: Number(route.departure.stationCoordsLon) }),
    toCountry: extractLocationDetails(route.departure.fromLocation, locale).countryName,
    toStationId: `${route.arrival.stationId}`,
    toStationName: `${route.arrival.stationName}`,
    toTimezone: route.arrival.toLocation.timezone.zoneName,
    customerTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    ...(!!route.arrival.stationCoordsLat && { toStationLat: Number(route.arrival.stationCoordsLat) }),
    ...(!!route.arrival.stationCoordsLon && { toStationLon: Number(route.arrival.stationCoordsLon) }),
    departureDateTime: route.departure.dateTime ? `${route.departure.dateTime}` : '',
    arrivalDateTime: route.arrival.dateTime ? `${route.arrival.dateTime}` : '',
    ...(!!route.carrier.id && { carrierId: `${route.carrier.id}` }),
    ...(!!route.carrier.name && { carrierName: route.carrier.name }),

    tripType: 'oneway',
    orderType: formData.payment,
    currency: 'UAH',
    locale,
    ...(!!user?.id && { userId: user.id }),
    customerFirstName: tickets[0].firstName,
    customerLastName: tickets[0].lastName,
    customerEmail: formData.email,
    customerPhone: formData.phone,
    tickets,
  };
};

export default normalizeData;
