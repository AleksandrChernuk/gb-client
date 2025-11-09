import { TPaidBaggage } from '@/shared/types/paid.baggage.types';

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
