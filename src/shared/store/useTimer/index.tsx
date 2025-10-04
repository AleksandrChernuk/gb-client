import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface TimerState {
  startedAt: number | null;
  open: boolean;
  setStartedAt: (time: number) => void;
  setOpen: (val: boolean) => void;
  reset: () => void;
  hasHydrated: boolean;
  setHasHydrated: (val: boolean) => void;
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set) => ({
      startedAt: null,
      open: false,
      setStartedAt: (time) => set({ startedAt: time }),
      setOpen: (val) => set({ open: val }),
      reset: () => {
        set({ startedAt: null, open: false });
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
