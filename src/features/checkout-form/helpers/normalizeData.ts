import { NormalizeDataParams } from '@/features/checkout-form/types';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import { IRequestOrder, RequestTicket } from '@/shared/types/order-interface';

const normalizeData = ({ fromCityId, toCityId, locale, formData, user, route }: NormalizeDataParams): IRequestOrder => {
  const details = route.details;

  const transtempoDiscount =
    route.providerName === 'TRANSTEMPO' && Array.isArray(route.details?.discounts) ? route.details.discounts[0] : null;

  const tickets: RequestTicket[] = formData.passengers.map((passenger, idx) => {
    const ticketData: RequestTicket = {
      firstName: passenger.firstName,
      lastName: passenger.lastName,
      ...(passenger.middlename && { middlename: passenger.middlename }),
      ...(passenger.middlename && { middlename: passenger.middlename }),
      ...(details?.needBirth && passenger.bday && { birthdate: passenger.bday }),
      ...(passenger.documentType && { documentType: Number(passenger.documentType) }),
      ...(passenger.documentNumber && { documentNumber: passenger.documentNumber }),
      ...(passenger.gender && { gender: passenger.gender }),
      ...(passenger.citizenship && { citizenship: passenger.citizenship }),

      phone: formData.phone,
      email: formData.email,

      seatId: formData.selectedSeats?.[idx]?.seatId ?? route.details?.freeSeatsMap?.[idx]?.seatId ?? '',
      seatNumber: formData.selectedSeats?.[idx]?.seatNumber ?? route.details?.freeSeatsMap?.[idx]?.seatNumber ?? '',

      withFees: true,
      buggageCount: 1,
    };

    if (route.providerName === 'TRANSTEMPO' && transtempoDiscount) {
      if (transtempoDiscount.id) ticketData.discountId = transtempoDiscount.id;
      if (typeof transtempoDiscount.percent === 'number') ticketData.discountPercent = transtempoDiscount.percent;
      if (transtempoDiscount.description) ticketData.discountDescription = transtempoDiscount.description;
    }

    if (passenger.discount) ticketData.discountId = passenger.discount;
    if (passenger.discountDescription) ticketData.discountDescription = passenger.discountDescription;
    if (passenger.discountPercent) ticketData.discountPercent = Number(passenger.discountPercent);

    return ticketData;
  });

  const departureLocation = extractLocationDetails(route.departure.fromLocation, locale);
  const arrivalLocation = extractLocationDetails(route.arrival.toLocation, locale);

  return {
    providerId: route.identificators.providerId,

    ...(route.identificators.routeId && { routeId: route.identificators.routeId }),
    ...(route.identificators.rideId && { rideId: route.identificators.rideId }),
    ...(route.identificators.tripId && { tripId: route.identificators.tripId }),
    ...(route.identificators.timetableId && { timetableId: route.identificators.timetableId }),
    ...(route.identificators.intervalId && { intervalId: route.identificators.intervalId }),
    ...(route.identificators.busId && { busId: route.identificators.busId }),

    ...(route?.providerName === 'KLR' && {
      busId: `${route?.details?.transportId}`,
    }),

    ...(route.identificators.routeName && { routeName: route.identificators.routeName }),

    canPaymentToDriver: !!route.allowedOperations.canPaymentToDriver,

    ...(typeof route.identificators.metadata === 'object' && route.identificators.metadata !== null
      ? { metadata: route.identificators.metadata }
      : {}),

    fromCityId: fromCityId,
    fromCityName: departureLocation.locationName,
    fromCountry: departureLocation.countryName,
    fromTimezone: route.departure.fromLocation.timezone.zoneName,
    fromStationId: `${route.departure.stationId}`,
    fromStationName: `${route.departure.stationName}`,
    ...(route?.departure.stationAddress && { fromStationAddress: route.departure.stationAddress }),
    ...(route.departure.stationCoordsLat && { fromStationLat: Number(route.departure.stationCoordsLat) }),
    ...(route.departure.stationCoordsLon && { fromStationLon: Number(route.departure.stationCoordsLon) }),

    toCityId: toCityId,
    toCityName: arrivalLocation.locationName,
    toCountry: arrivalLocation.countryName,
    toStationId: `${route.arrival.stationId}`,
    toStationName: `${route.arrival.stationName}`,
    toTimezone: route.arrival.toLocation.timezone.zoneName,

    ...(route?.identificators.bustypeId && { bustypeId: route.identificators.bustypeId }),

    ...(route?.arrival.stationAddress && { toStationAddress: route.arrival.stationAddress }),
    ...(route.arrival.stationCoordsLat && { toStationLat: Number(route.arrival.stationCoordsLat) }),
    ...(route.arrival.stationCoordsLon && { toStationLon: Number(route.arrival.stationCoordsLon) }),

    departureDateTime: route.departure.dateTime ? `${route.departure.dateTime}` : '',
    arrivalDateTime: route.arrival.dateTime ? `${route.arrival.dateTime}` : '',
    customerTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    ...(route.duration && { duration: route.duration }),

    ...(route.carrier.id && { carrierId: `${route.carrier.id}` }),
    ...(route.carrier.name && { carrierName: route.carrier.name }),

    ...(route?.details?.automaticDiscountId && { automaticDiscountId: route.details.automaticDiscountId }),

    ...(route.details?.returnRulesDescription && { refundRules: route.details?.returnRulesDescription }),

    eTicket: !!route.eTicket,

    tripType: 'oneway',
    orderType: formData.payment,
    currency: 'UAH',
    locale,

    ...(user?.id && { userId: user.id }),

    ...(tickets[0]?.firstName && { customerFirstName: tickets[0].firstName }),
    ...(tickets[0]?.lastName && { customerLastName: tickets[0].lastName }),
    customerEmail: formData.email,
    customerPhone: formData.phone,

    tickets,
  };
};

export default normalizeData;
