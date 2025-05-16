import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { LocationStore } from './types';

export const useLocation = create<LocationStore>()(
  devtools(
    immer(
      persist(
        (set) => ({
          locations: null,
          favoriteLocations: null,
          setLocations: (locations) => {
            set((state) => {
              state.locations = locations;
            });
          },
          setFavoriteLocations(locations) {
            set((state) => {
              state.favoriteLocations = locations;
            });
          },
        }),
        { name: 'locations' },
      ),
    ),
  ),
);
