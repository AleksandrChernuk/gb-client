import { create } from 'zustand';
import { persist, StorageValue } from 'zustand/middleware';
import { LocationsStore } from './types';
import { immer } from 'zustand/middleware/immer';

export const useLocationsStore = create<LocationsStore>()(
  persist(
    immer((set) => ({
      hasHydrated: false,
      setHasHydrated: (val: boolean) => set({ hasHydrated: val }),
      setLocations: (locations) => {
        set((state) => {
          state.locations = locations;
        });
      },
    })),
    {
      name: 'locations-store',
      storage: {
        getItem: (name: string) => {
          const item = localStorage.getItem(name);
          if (!item) return null;
          try {
            return JSON.parse(item) as StorageValue<LocationsStore>;
          } catch (error) {
            console.log(error);
            localStorage.removeItem(name);
            return null;
          }
        },
        setItem: (name: string, value: unknown) => {
          try {
            localStorage.setItem(name, JSON.stringify(value));
          } catch (error) {
            console.log(error);
          }
        },
        removeItem: (name: string) => {
          localStorage.removeItem(name);
        },
      },
      onRehydrateStorage: () => (state: LocationsStore | undefined) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
