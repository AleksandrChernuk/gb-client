import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { LocationsStore } from './types';
import { immer } from 'zustand/middleware/immer';

export const useLocationsStore = create<LocationsStore>()(
  devtools(
    immer((set) => ({
      locations: [],
      favoriteLocations: [],
      hasHydrated: false,
      setHasHydrated: (val: boolean) => set({ hasHydrated: val }),
      setLocations: (locations) => {
        set((state) => {
          state.locations = locations;
        });
      },
      setFavoriteLocations: (locations) => {
        set((state) => {
          state.favoriteLocations = locations;
        });
      },
    })),
  ),
);
