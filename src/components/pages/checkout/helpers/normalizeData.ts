/* eslint-disable @typescript-eslint/no-explicit-any */
import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { ICurrentUser } from '@/store/useUser/types';
import { IDiscountOrder, ISeatOrder, OrderInterface } from '@/types/order-interface';
import { IRouteResponse } from '@/types/route.types';

type NormalizeDataParams = {
  from_city_id: number;
  to_city_id: number;
  locale: string;
  formData: any;
  user: ICurrentUser | null;
  route: IRouteResponse;
};

export interface TicketInterface {
  first_name: string;
  last_name: string;
  middlename?: string;
  birthdate?: string;
  document_type?: number;
  document_number?: string;
  document_expire_at?: string; // example: '2030-12-31',
  gender?: 'M' | 'F';
  citizenship?: string; // example: 'UA'
  phone: string;
  email: string;
  seat?: ISeatOrder;
  discount?: IDiscountOrder;
  with_fees?: boolean;
  buggage_count?: number;
}

const normalizeData = ({
  from_city_id,
  to_city_id,
  locale,
  formData,
  user,
  route,
}: NormalizeDataParams): OrderInterface => {
  console.log(formData);
  const tickets = formData.passengers.map((p: any, idx: string | number) => ({
    // ticket_type_id?: number; //! Mew
    first_name: p.first_name,
    last_name: p.last_name,
    ticket_price: route.ticket_pricing.base_price,
    middlename: p.middlename,
    birthdate: p.bday,
    document_type: p.document_type,
    document_number: p.document_number,
    document_expire_at: p.document_expire_at,
    gender: p.gender,
    citizenship: p.citizenship,
    phone: formData.phone,
    email: formData.email,
    seat: { seat_id: formData.selected_seats[idx]?.seat_id, seat_number: formData.selected_seats[idx]?.seat_number },
    discount_id: p.discount,
    discount_description: p.discount_description,
    discount_percent: p.discount_percent,
    with_fees: true,
    buggage_count: 1,
  }));

  return {
    provider_id: route.identificators.provider_id,
    route_id: route.identificators.route_id,
    ride_id: route.identificators.ride_id ? route.identificators.ride_id : undefined,
    tripId: route.identificators.tripId ? route.identificators.tripId : undefined,
    intervalId: route.identificators.intervalId,
    bus_id: route.identificators.bus_id,
    route_name: route.identificators.route_name,
    can_payment_to_driver: false,
    metadata: route.identificators.metadata,
    from_city_id,
    from_city_name: extractLocationDetails(route.departure.fromLocation, locale).locationName,
    to_city_name: extractLocationDetails(route.arrival.toLocation, locale).locationName,
    from_station_id: Number(route.departure.station_id),
    from_station_name: route.departure.station_name ?? '',
    from_station_lat: route.departure.station_coords_lat ? Number(route.departure.station_coords_lat) : undefined,
    from_station_lon: route.departure.station_coords_lon ? Number(route.departure.station_coords_lon) : undefined,
    to_city_id,
    to_station_id: Number(route.arrival.station_id),
    to_station_name: route.arrival.station_name ?? '',
    to_station_lat: route.arrival.station_coords_lat ? Number(route.arrival.station_coords_lat) : undefined,
    to_station_lon: route.arrival.station_coords_lon ? Number(route.arrival.station_coords_lon) : undefined,
    departure_date: route.departure.date_time ?? '',
    arrival_date: route.arrival.date_time ?? '',
    departure_time: route.departure.date_time ?? '',
    arrival_time: route.arrival.date_time ?? '',
    carrier_id: route.carrier.id ?? '',
    carrier_name: route.carrier.name ?? '',
    trip_type: 'ONEWAY',
    payment_type: formData.payment,
    currency: 'UAH',
    locale,
    userId: user?.id ?? undefined,
    customer_first_name: tickets[0].first_name,
    customer_last_name: tickets[0].last_name,
    customer_email: formData.email,
    customer_phone: formData.phone,
    automatic_discount_id: route.details?.automatic_discount_id ? route.details?.automatic_discount_id : undefined,
    tickets,
  };
};

export default normalizeData;
