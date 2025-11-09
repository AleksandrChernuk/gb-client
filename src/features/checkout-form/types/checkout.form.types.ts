import { PassengerFormData } from '@/features/checkout-form/types/passenger.form.types';

export interface TCheckoutForm {
  passengers: PassengerFormData[];
  phone: string;
  email: string;
  selectedSeats?: Array<{ seatId: string; seatNumber: string }>;
  payment: 'BOOK' | 'PAYMENT_AT_BOARDING';
  accept_rules?: boolean;
}
