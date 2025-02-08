export type TPassenger = {
  id: string;
  name: string;
  surname: string;
  date: string;
  birthday: string;
  notes: string;
  discount: string;
  isChildren: boolean;
  seat: string;
};

export type TPayment = 'card' | 'payment at boarding' | 'booking';

export type FormValues = {
  passengers: TPassenger[];
  payment: TPayment;
  email: string;
  phone: string;
  accept_rules: boolean;
  processing_data: boolean;
};
