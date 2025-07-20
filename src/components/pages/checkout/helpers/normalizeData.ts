/* eslint-disable @typescript-eslint/no-explicit-any */
import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { ICurrentUser } from '@/store/useUser/types';
import { IRequestOrder, RequestTicket } from '@/types/order-interface';
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
  const tickets = formData.passengers.map((p: any, idx: string | number) => ({
    firstName: p.first_name,
    lastName: p.last_name,
    ...(!!p.middlename && { middlename: p.middlename }),
    ...(!!p.bday && { birthdate: p.bday }),
    ...(!!p.document_type && { documentType: p.document_type }),
    ...(!!p.document_number && { documentNumber: p.document_number }),
    ...(!!p.gender && { gender: p.gender }),
    ...(!!p.citizenship && { citizenship: p.citizenship }),
    phone: formData.phone,
    email: formData.email,
    seatId:
      route.providerName === 'INFOBUS'
        ? route.details?.freeSeatsMap?.[Number(idx)]?.seatId
        : formData.selected_seats[idx]?.id,
    seatNumber:
      route.providerName === 'INFOBUS'
        ? route.details?.freeSeatsMap?.[Number(idx)]?.seatNumber
        : formData.selected_seats[idx]?.number,
    ...(!!p.discount && { discountId: p.discount }),
    ...(!!p.discountDescription && { discountDescription: p.discountDescription }),
    ...(!!p.discountPercent && { discountPercent: p.discountPercent }),
    withFees: true,
    buggageCount: 1,
  })) as RequestTicket[];

  return {
    providerId: route.identificators.providerId,
    ...(!!route.identificators.routeId && { routeId: `${route.identificators.routeId}` }),
    ...(!!route.identificators.rideId && { rideId: route.identificators.rideId }),
    ...(!!route.identificators.tripId && { tripId: route.identificators.tripId }),
    ...(!!route.identificators.intervalId && { intervalId: route.identificators.intervalId }),
    ...(!!route.identificators.busId && { busId: `${route.identificators.busId}` }),
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
