import { addMonths, format, isBefore, startOfMonth } from 'date-fns';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { SearchStore } from './types';

export const useSearchStore = create<SearchStore>()(
  devtools(
    immer(
      persist(
        (set) => ({
          from: null,
          to: null,
          isHydrated: false,
          date: format(new Date(), 'yyyy-MM-dd'),
          month: new Date(),
          adult: 1,
          children: 0,
          errors: {
            from: null,
            to: null,
          },

          setDate: (newDate) =>
            set((state) => {
              state.date = newDate;
            }),

          setCityId: (cityKey, cityId) =>
            set((state) => {
              state[cityKey] = cityId;
            }),

          setPassenger: (passengerType, value) =>
            set((state) => {
              state[passengerType] = value;
            }),

          incrementMonth: () =>
            set((state) => {
              state.month = addMonths(state.month, 1);
            }),

          decrementMonth: () =>
            set((state) => {
              state.month = addMonths(state.month, -1);
            }),

          setMonth: (newMonth) =>
            set((state) => {
              state.month = newMonth;
            }),

          swap: () =>
            set((state) => {
              const temp = state.from;
              state.from = state.to;
              state.to = temp;
            }),

          setErrors: (cityKey, error) =>
            set((state) => {
              state.errors = {
                ...state.errors,
                [cityKey]: error,
              };
            }),
        }),
        {
          name: 'main-search',
          onRehydrateStorage: () => (state) => {
            if (state) {
              state.isHydrated = true;

              if (state.date && isBefore(new Date(state.date), new Date())) {
                state.date = format(new Date(), 'yyyy-MM-dd');
              }

              const currentMonth = startOfMonth(new Date());
              if (!state.month || isBefore(new Date(state.month), currentMonth)) {
                state.month = new Date();
              }
            }
          },
        },
      ),
    ),
  ),
);
