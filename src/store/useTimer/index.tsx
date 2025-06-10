import { create } from 'zustand';
import { persist, StorageValue } from 'zustand/middleware';

interface TimerState {
  startedAt: number | null;
  priceDialogShown: boolean;
  setStartedAt: (time: number) => void;
  setPriceDialogShown: (shown: boolean) => void;
  reset: () => void;
  hasHydrated: boolean;
  setHasHydrated: (val: boolean) => void;
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set) => ({
      startedAt: null,
      priceDialogShown: false,
      setStartedAt: (time) => set({ startedAt: time }),
      setPriceDialogShown: (shown) => set({ priceDialogShown: shown }),
      reset: () => {
        set({
          startedAt: null,
          priceDialogShown: false,
        });
        useTimerStore.persist.clearStorage();
      },
      hasHydrated: false,
      setHasHydrated: (val) => set({ hasHydrated: val }),
    }),
    {
      name: 'checkout-timer',
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          if (!item) return null;
          try {
            return JSON.parse(item) as StorageValue<TimerState>;
          } catch (error) {
            console.log(error);
            localStorage.removeItem(name);
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            localStorage.setItem(name, JSON.stringify(value));
          } catch (error) {
            console.log(error);
          }
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
