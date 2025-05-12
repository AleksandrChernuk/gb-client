import { ISeat } from './seat-interface';

export type TPassenger = {
  id: string;
  name: string;
  surname: string;
  notes: string;
  isChildren: boolean;
  price: string;
};

export type FormValues = {
  passengers: TPassenger[];
  email: string;
  phone: string;
  payment: 'card' | 'on_boarding' | 'booking';
  accept_rules: boolean;
  selected_seats: ISeat[] | [];
};
