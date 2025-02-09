import { ILocation } from '@/types/location.types';

export type TpassengerType = 'adult' | 'children';

export type TcityKey = 'from' | 'to';

export type Terrors = {
  from: string | null;
  to: string | null;
};

export type SearchState = {
  isHydrated: boolean;
  from: ILocation | null;
  to: ILocation | null;
  date: string;
  month: Date;
  adult: number;
  children: number;
  errors: Terrors;
};

export type SearchActions = {
  setDate: (newDate: string) => void;
  setErrors: (cityKey: TcityKey, error: string | null) => void;
  setCity: (cityKey: TcityKey, newCity: ILocation | null) => void;
  incrementPassenger: (passengerType: TpassengerType) => void;
  decrementPassenger: (passengerType: TpassengerType) => void;
  incrementMonth: () => void;
  decrementMonth: () => void;
  setMonth: (newMonth: Date) => void;
  swap: () => void;
};

export type SearchStore = SearchState & SearchActions;
