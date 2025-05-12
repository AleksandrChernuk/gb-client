import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { ICurrentUser } from '@/store/useStore/types';
import { FormValues } from '@/types/checkout-from.types';
import { IOrder } from '@/types/order-interface';
import { IRouteResponse } from '@/types/route.types';

type NormalizeDataParams = {
  from_city_id: number;
  to_city_id: number;
  locale: string;
  formData: FormValues;
  user: ICurrentUser | null;
  route: IRouteResponse;
};

const normalizeData = ({ from_city_id, to_city_id, locale, formData, user, route }: NormalizeDataParams): IOrder => {
  const tickets = formData.passengers.map((p, idx) => ({
    first_name: p.name,
    last_name: p.surname,
    seat: formData.selected_seats[idx],
    ticket_price: route.ticket_pricing.base_price,
    luggage_count: '1',
  }));

  return {
    provider_id: route.identificators.provider_id,
    route_id: route.identificators.route_id,
    trip_id: route.identificators.tripId,
    interval_id: route.identificators.intervalId,
    bus_id: route.identificators.bus_id,
    ticket_type_id: route.ticket_id,
    route_name: route.identificators.route_name,
    from_city_id,
    from_city_name: extractLocationDetails(route.departure.fromLocation, locale).locationName,
    to_city_id,
    to_city_name: extractLocationDetails(route.arrival.toLocation, locale).locationName,
    from_station_id: route.departure.station_id,
    from_station_name: route.departure.station_name,
    from_station_lat: route.departure.station_coords_lat,
    from_station_lon: route.departure.station_coords_lon,
    to_station_id: route.arrival.station_id,
    to_station_name: route.arrival.station_name,
    to_station_lat: route.arrival.station_coords_lat,
    to_station_lon: route.arrival.station_coords_lon,
    departure_date: route.departure.date_time,
    arrival_date: route.arrival.date_time,
    departure_time: route.departure.date_time,
    arrival_time: route.arrival.date_time,
    carrier_id: route.carrier.id,
    carrier_name: route.carrier.name,
    trip_type: 'oneway',
    payment_type: formData.payment,
    currency: 'UAH',
    locale,

    userId: user?.id ?? undefined,
    email: formData.email,
    phone: formData.phone,

    tickets,
  };
};

export default normalizeData;
