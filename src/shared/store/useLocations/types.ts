import { ILocation } from '@/shared/types/location.types';

export type LocationsState = {
  locations: ILocation[];
  favoriteLocations: ILocation[];
  hasHydrated: boolean;
};

export type LocationsActions = {
  setLocations: (locations: ILocation[]) => void;
  setFavoriteLocations: (locations: ILocation[]) => void;
  setHasHydrated: (val: boolean) => void;
};

export type LocationsStore = LocationsState & LocationsActions;
