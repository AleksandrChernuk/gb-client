import { TPaidBaggage } from '@/shared/types/paid.baggage.types';

export interface FormData {
  passengers: PassengerFormData[];
  phone: string;
  email: string;
  selectedSeats?: Array<{ seatId: string; seatNumber: string }>;
  payment: 'BOOK' | 'PAYMENT_AT_BOARDING';
  accept_rules?: boolean;
}
