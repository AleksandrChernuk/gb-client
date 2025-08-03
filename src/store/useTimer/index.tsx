// store/useTimer.ts

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface TimerState {
  startedAt: number | null;
  priceDialogShown: boolean;
  open: boolean;
  openPriceChange: boolean;
  setStartedAt: (time: number) => void;
  setPriceDialogShown: (shown: boolean) => void;
  reset: () => void;
  setOpen: (val: boolean) => void;
  setOpenPriceChange: (val: boolean) => void;
  hasHydrated: boolean;
  setHasHydrated: (val: boolean) => void;
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set) => ({
      startedAt: null,
      priceDialogShown: false,
      open: false,
      openPriceChange: false,
      setStartedAt: (time) => set({ startedAt: time }),
      setPriceDialogShown: (shown) => set({ priceDialogShown: shown }),
      setOpen: (val) => set({ open: val }),
      setOpenPriceChange: (val) => set({ openPriceChange: val }),
      reset: () => {
        set({
          startedAt: null,
          priceDialogShown: false,
          open: false,
          openPriceChange: false,
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
