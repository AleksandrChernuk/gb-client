import { ILocation } from '@/shared/types/location.types';

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
  setPassenger: (passengerType: TpassengerType, value: number) => void;
  incrementMonth: () => void;
  decrementMonth: () => void;
  setMonth: (newMonth: Date) => void;
  swap: () => void;
};

export type SearchStore = SearchState & SearchActions;
