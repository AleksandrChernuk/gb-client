import { INewOrderResponse } from '@/types/payment.types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type OrderResultState = {
  isHydrated: boolean;
  loadingResult: boolean;
  initiateNewOrder: INewOrderResponse | null;
};

export type OrderResultActions = {
  setInitiateNewOrder: (data: INewOrderResponse | null) => void;
  resetInitiateNewOrder: () => void;
  setLoadingResult: (v: boolean) => void;
};

export type OrderResultStore = OrderResultState & OrderResultActions;

export const useNewOrderResult = create<OrderResultStore>()(
  immer(
    persist(
      (set) => ({
        isHydrated: false,
        initiateNewOrder: null,
        loadingResult: false,

        setInitiateNewOrder: (data) => {
          set((state) => {
            state.initiateNewOrder = data;
          });
        },

        resetInitiateNewOrder: () => {
          set((state) => {
            state.initiateNewOrder = null;
          });
        },

        setLoadingResult: (v) => {
          set((state) => {
            state.loadingResult = v;
          });
        },
      }),
      {
        name: 'order-result',
        storage: createJSONStorage(() => sessionStorage),
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.isHydrated = true;
          }
        },
      },
    ),
  ),
);
