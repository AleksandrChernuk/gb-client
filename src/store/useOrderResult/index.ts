import { InitiatePaymentInterface } from '@/types/payment.types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type OrderResultState = {
  isHydrated: boolean;
  loadingResult: boolean;
  initiatePayment: InitiatePaymentInterface | null;
};

export type OrderResultActions = {
  setInitiatePayment: (data: InitiatePaymentInterface | null) => void;
  setLoadingResult: (v: boolean) => void;
};

export type OrderResultStore = OrderResultState & OrderResultActions;

export const useOrderResult = create<OrderResultStore>()(
  immer(
    persist(
      (set) => ({
        isHydrated: false,
        initiatePayment: null,
        loadingResult: false,

        setInitiatePayment: (data) => {
          set((state) => {
            state.initiatePayment = data;
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
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.isHydrated = true;
          }
        },
      },
    ),
  ),
);
