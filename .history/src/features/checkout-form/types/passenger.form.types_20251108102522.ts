import { TPaidBaggage } from '@/shared/types/paid.baggage.types';

export interface PassengerFormData {
  firstName: string;
  lastName: string;
  bday?: string;
  documentType?: number;
  gender?: 'M' | 'F';
  citizenship?: string;
  discount?: string;
  discountDescription?: string;
  discountPercent?: string;

  price: number;
  discountId?: string;
  expiryDate?: string;
  middlename?: string;
  documentNumber?: string;
  paidBaggage?: TPaidBaggage[];
}
