import { NormalizeDataParams } from '@/features/checkout-form/types';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import { IRequestOrder, RequestTicket } from '@/shared/types/order-interface';

// Утилита для добавления опциональных полей (не используется, оставлена для справки)
// const addOptionalField = <T>(condition: boolean, field: T): T | {} => {
//   return condition ? field : {};
// };

/**
 * Нормализует данные формы заказа для отправки на сервер
 * Преобразует данные из UI формата в формат API
 */
const normalizeData = ({ fromCityId, toCityId, locale, formData, user, route }: NormalizeDataParams): IRequestOrder => {
  const details = route.details;

  // Преобразуем данные пассажиров в формат билетов
  const tickets: RequestTicket[] = formData.passengers.map((passenger, idx) => {
    // Определяем ID скидки (специальная логика для TRANSTEMPO)
    const discountId =
      passenger.discount ?? (route.providerName === 'TRANSTEMPO' ? route.details?.discounts?.[0]?.id : undefined);

    // Формируем данные билета согласно типу RequestTicket
    const ticketData: RequestTicket = {
      // Основные данные пассажира
      firstName: passenger.firstName,
      lastName: passenger.lastName,

      // Опциональные поля пассажира
      ...(passenger.middlename && { middlename: passenger.middlename }),
      ...(details?.needBirth && passenger.bday && { birthdate: passenger.bday }),
      ...(passenger.documentType && { documentType: passenger.documentType }),
      ...(passenger.documentNumber && { documentNumber: passenger.documentNumber }),
      ...(passenger.gender && { gender: passenger.gender }),
      ...(passenger.citizenship && { citizenship: passenger.citizenship }),

      // Контактные данные (общие для всех пассажиров)
      phone: formData.phone,
      email: formData.email,

      // Данные о месте
      seatId: formData.selectedSeats?.[idx]?.seatId ?? route.details?.freeSeatsMap?.[Number(idx)]?.seatId ?? '',
      seatNumber:
        formData.selectedSeats?.[idx]?.seatNumber ?? route.details?.freeSeatsMap?.[Number(idx)]?.seatNumber ?? '',

      // Данные о скидках
      ...(discountId && { discountId }),
      ...(passenger.discountDescription && { discountDescription: passenger.discountDescription }),
      ...(passenger.discountPercent && { discountPercent: Number(passenger.discountPercent) }),

      // Фиксированные параметры
      withFees: true,
      buggageCount: 1,
    };

    return ticketData;
  });

  // Извлекаем детали локаций для отправления и прибытия
  const departureLocation = extractLocationDetails(route.departure.fromLocation, locale);
  const arrivalLocation = extractLocationDetails(route.arrival.toLocation, locale); // ИСПРАВЛЕНО: было fromLocation

  // Формируем основной объект заказа
  return {
    // ID провайдера (обязательное поле)
    providerId: route.identificators.providerId,

    // Идентификаторы маршрута (условно добавляемые)
    ...(route.identificators.routeId && { routeId: route.identificators.routeId }),
    ...(route.identificators.rideId && { rideId: route.identificators.rideId }),
    ...(route.identificators.tripId && { tripId: route.identificators.tripId }),
    ...(route.identificators.timetableId && { timetableId: route.identificators.timetableId }),
    ...(route.identificators.intervalId && { intervalId: route.identificators.intervalId }),
    ...(route.identificators.busId && { busId: route.identificators.busId }),

    // Специальная логика для провайдера KLR
    ...(route?.providerName === 'KLR' && {
      busId: `${route?.details?.transportId}`,
    }),

    ...(route.identificators.routeName && { routeName: route.identificators.routeName }),

    // Возможность оплаты водителю
    canPaymentToDriver: !!route.allowedOperations.canPaymentToDriver,

    // Метаданные (только если это объект)
    ...(typeof route.identificators.metadata === 'object' && route.identificators.metadata !== null
      ? { metadata: route.identificators.metadata }
      : {}),

    // Данные отправления
    fromCityId: fromCityId,
    fromCityName: departureLocation.locationName,
    fromCountry: departureLocation.countryName,
    fromTimezone: route.departure.fromLocation.timezone.zoneName,
    fromStationId: `${route.departure.stationId}`,
    fromStationName: `${route.departure.stationName}`,
    ...(route?.departure.stationAddress && { fromStationAddress: route.departure.stationAddress }),
    ...(route.departure.stationCoordsLat && { fromStationLat: Number(route.departure.stationCoordsLat) }),
    ...(route.departure.stationCoordsLon && { fromStationLon: Number(route.departure.stationCoordsLon) }),

    // Данные прибытия
    toCityId: toCityId,
    toCityName: arrivalLocation.locationName,
    toCountry: arrivalLocation.countryName, // ИСПРАВЛЕНО: теперь используется arrivalLocation
    toStationId: `${route.arrival.stationId}`,
    toStationName: `${route.arrival.stationName}`,
    toTimezone: route.arrival.toLocation.timezone.zoneName,
    ...(route?.arrival.stationAddress && { toStationAddress: route.arrival.stationAddress }),
    ...(route.arrival.stationCoordsLat && { toStationLat: Number(route.arrival.stationCoordsLat) }),
    ...(route.arrival.stationCoordsLon && { toStationLon: Number(route.arrival.stationCoordsLon) }),

    // Временные данные
    departureDateTime: route.departure.dateTime ? `${route.departure.dateTime}` : '',
    arrivalDateTime: route.arrival.dateTime ? `${route.arrival.dateTime}` : '',
    customerTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    ...(route.duration && { duration: route.duration }),

    // Данные перевозчика
    ...(route.carrier.id && { carrierId: `${route.carrier.id}` }),
    ...(route.carrier.name && { carrierName: route.carrier.name }),

    // Дополнительная информация
    ...(route.details?.returnRulesDescription && { refundRules: route.details?.returnRulesDescription }),
    eTicket: !!route.eTicket,

    // Параметры заказа
    tripType: 'oneway',
    orderType: formData.payment,
    currency: 'UAH',
    locale,

    // Данные пользователя (проверяем на null)
    ...(user?.id && { userId: user.id }),

    // Данные основного клиента (берем от первого пассажира, поля опциональные в IRequestOrder)
    ...(tickets[0]?.firstName && { customerFirstName: tickets[0].firstName }),
    ...(tickets[0]?.lastName && { customerLastName: tickets[0].lastName }),
    customerEmail: formData.email,
    customerPhone: formData.phone,

    // Массив билетов
    tickets,
  };
};

export default normalizeData;
