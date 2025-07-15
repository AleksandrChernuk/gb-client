import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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
      storage: createJSONStorage(() => sessionStorage),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
