import { TPaidBaggage } from '@/shared/types/paid.baggage.types';
import { IRouteResponse } from '@/shared/types/route.types';
import { ICurrentUser } from '@/shared/types/user';

export interface PassengerFormData {
  firstName: string;
  lastName: string;
  middlename?: string;
  bday?: string;
  documentType?: number;
  documentNumber?: string;
  gender?: 'M' | 'F';
  citizenship?: string;
  discount?: string;
  discountDescription?: string;
  discountPercent?: string;
  paidBaggage?: TPaidBaggage[];
}

export interface FormData {
  passengers: PassengerFormData[];
  phone: string;
  email: string;
  selectedSeats?: Array<{ seatId: string; seatNumber: string }>;
  payment: 'BOOK' | 'PAYMENT_AT_BOARDING';
  accept_rules?: boolean;
}

export type TNormalizeParams = {
  fromCityId: number;
  toCityId: number;
  locale: string;
  formData: FormData;
  user: ICurrentUser | null;
  route: IRouteResponse;
};
