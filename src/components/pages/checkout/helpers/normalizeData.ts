/* eslint-disable @typescript-eslint/no-explicit-any */
import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { ICurrentUser } from '@/store/useUser/types';
import { IRequestOrder, RequestTicket } from '@/types/order-interface';
import { IRouteResponse } from '@/types/route.types';
import { format } from 'date-fns';

type NormalizeDataParams = {
  from_city_id: number;
  to_city_id: number;
  locale: string;
  formData: any;
  user: ICurrentUser | null;
  route: IRouteResponse;
};

const normalizeData = ({
  from_city_id,
  to_city_id,
  locale,
  formData,
  user,
  route,
}: NormalizeDataParams): IRequestOrder => {
  const tickets = formData.passengers.map((p: any, idx: string | number) => ({
    firstName: p.first_name,
    lastName: p.last_name,
    ...(p.middlename && { middlename: p.middlename }),
    ...(p.bday && { birthdate: p.bday }),
    ...(p.document_type && { documentType: p.document_type }),
    ...(p.document_number && { documentNumber: p.document_number }),
    ...(p.gender && { gender: p.gender }),
    ...(p.citizenship && { citizenship: p.citizenship }),
    phone: formData.phone,
    email: formData.email,
    ...(formData.selected_seats[idx]?.id && { seatId: formData.selected_seats[idx]?.id }),
    ...(formData.selected_seats[idx]?.number && { seatNumber: formData.selected_seats[idx]?.number }),
    ...(p.discount && { discountId: p.discount }),
    ...(p.discount_description && { discountDescription: p.discount_description }),
    ...(p.discount_percent && { discountPercent: p.discount_percent }),
    withFees: true,
    buggageCount: 1,
  })) as RequestTicket[];

  return {
    providerId: route.identificators.provider_id,
    ...(route.identificators.route_id && { routeId: route.identificators.route_id }),
    ...(route.identificators.ride_id && { rideId: route.identificators.ride_id }),
    ...(route.identificators.tripId && { tripId: route.identificators.tripId }),
    ...(route.identificators.intervalId && { intervalId: route.identificators.intervalId }),
    ...(route.identificators.bus_id && { busId: route.identificators.bus_id }),
    ...(route.identificators.route_name && { routeName: route.identificators.route_name }),
    canPaymentToDriver: !!route.allowed_operations.can_payment_to_driver,
    ...(typeof route.identificators.metadata === 'object' && route.identificators.metadata !== null
      ? { metadata: route.identificators.metadata }
      : {}),
    fromCityId: from_city_id,
    eTicket: !!route.e_ticket,
    fromCityName: extractLocationDetails(route.departure.fromLocation, locale).locationName,
    fromCountry: extractLocationDetails(route.departure.fromLocation, locale).countryName,
    fromTimezone: route.departure.fromLocation.timezone.zoneName,
    toCityId: to_city_id,
    toCityName: extractLocationDetails(route.arrival.toLocation, locale).locationName,
    fromStationId: `${route.departure.station_id}`,
    fromStationName: `${route.departure.station_name}`,
    ...(route.departure.station_coords_lat && { fromStationLat: route.departure.station_coords_lat }),
    ...(route.departure.station_coords_lon && { fromStationLon: route.departure.station_coords_lon }),
    toCountry: extractLocationDetails(route.departure.fromLocation, locale).countryName,
    toStationId: `${route.arrival.station_id}`,
    toStationName: `${route.arrival.station_name}`,
    toTimezone: route.arrival.toLocation.timezone.zoneName,
    customerTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    ...(route.arrival.station_coords_lat && { toStationLat: route.arrival.station_coords_lat }),
    ...(route.arrival.station_coords_lon && { toStationLon: route.arrival.station_coords_lon }),
    departureDateTime: `${route.departure.date_time && format(route.departure.date_time, "yyyy-MM-dd'T'HH:mm:ss'Z'")}`,
    arrivalDateTime: `${route.arrival.date_time && format(route.arrival.date_time, "yyyy-MM-dd'T'HH:mm:ss'Z'")}`,
    ...(route.carrier.id && { carrierId: route.carrier.id }),
    ...(route.carrier.name && { carrierName: route.carrier.name }),
    tripType: 'oneway',
    orderType: 'BOOK',
    currency: 'UAH',
    locale,
    ...(user?.id && { userId: user.id }),
    customerFirstName: tickets[0].firstName,
    customerLastName: tickets[0].lastName,
    customerEmail: formData.email,
    customerPhone: formData.phone,
    tickets,
  };
};

export default normalizeData;
