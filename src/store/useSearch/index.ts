import { addMonths, format } from 'date-fns';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { SearchStore } from './types';

export const useSearchStore = create<SearchStore>()(
  devtools(
    immer(
      persist(
        (set, get) => ({
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
            set((state) => ({
              ...state,
              date: newDate,
            })),

          setCity: (cityKey, newCity) =>
            set((state) => ({
              ...state,
              [cityKey]: newCity,
            })),

          incrementPassenger: (passengerType) => {
            set((state) => {
              const newValue = state[passengerType] + 1;
              return {
                ...state,
                [passengerType]: newValue,
              };
            });
          },

          decrementPassenger: (passengerType) => {
            set((state) => {
              const newValue = Math.max(0, state[passengerType] - 1);
              return {
                ...state,
                [passengerType]: newValue,
              };
            });
          },

          incrementMonth: () => {
            const { month } = get();

            set((state) => ({
              ...state,
              month: addMonths(month, 1),
            }));
          },

          decrementMonth: () => {
            const { month } = get();

            set((state) => ({
              ...state,
              month: addMonths(month, -1),
            }));
          },

          setMonth: (newMonth) =>
            set((state) => ({
              ...state,
              month: newMonth,
            })),

          swap: () =>
            set((state) => ({
              ...state,
              to: state.from,
              from: state.to,
            })),

          setErrors: (cityKey, error) =>
            set((state) => ({
              ...state,
              errors: { ...state.errors, [cityKey]: error },
            })),
        }),
        {
          name: 'main-search',
          onRehydrateStorage: () => (state) => {
            if (state) {
              state.isHydrated = true;
            }
          },
        }
      )
    )
  )
);
