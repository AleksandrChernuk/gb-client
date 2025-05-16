import { ILocation } from '@/types/location.types';

export type LocationState = {
  locations: ILocation[] | null;
  favoriteLocations: ILocation[] | null;
};

export type LocationActions = {
  setLocations: (locations: ILocation[] | null) => void;
  setFavoriteLocations: (locations: ILocation[] | null) => void;
};

export type LocationStore = LocationState & LocationActions;
