import { ISeat } from './seat-interface';

export type TPassenger = {
  id: string;
  name: string;
  surname: string;
  dob: string;
  document: { type: string; number: string };
  notes: string;
  discount: string;
  gender: string;
  citizenship: string;
  isChildren: boolean;
  seat: string;
};

export type FormValues = {
  passengers: TPassenger[];
  email: string;
  phone: string;
  payment: 'card' | 'on_boarding' | 'booking';
  accept_rules: boolean;
  processing_data: boolean;
  selected_seats: ISeat[] | [];
};
