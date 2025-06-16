import { ILocation } from '@/types/location.types';

export type LocationsState = {
  locations?: ILocation[];
  hasHydrated: boolean;
};

export type LocationsActions = {
  setLocations: (locations?: ILocation[]) => void;
  setHasHydrated: (val: boolean) => void;
};

export type LocationsStore = LocationsState & LocationsActions;
