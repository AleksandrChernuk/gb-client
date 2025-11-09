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

  price: number;
  discountId?: string;
  expiryDate?: string;
  gender?: 'M' | 'F';
  citizenship?: string;
  middlename?: string;
  documentNumber?: string;
  paidBaggage?: TPaidBaggage[];
}
