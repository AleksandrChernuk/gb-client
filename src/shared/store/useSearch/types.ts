export type TpassengerType = 'adult' | 'children';

export type TcityKey = 'from' | 'to';

export type Terrors = {
  from: string | null;
  to: string | null;
};

export type SearchState = {
  isHydrated: boolean;
  from: number | null;
  to: number | null;
  date: string;
  month: Date;
  adult: number;
  children: number;
  errors: Terrors;
};

export type SearchActions = {
  setDate: (newDate: string) => void;
  setErrors: (cityKey: 'from' | 'to', error: string | null) => void;
  setCityId: (cityKey: TcityKey, cityId: number | null) => void;
  setPassenger: (passengerType: TpassengerType, value: number) => void;
  incrementMonth: () => void;
  decrementMonth: () => void;
  setMonth: (newMonth: Date) => void;
  swap: () => void;
};

export type SearchStore = SearchState & SearchActions;
