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
}
