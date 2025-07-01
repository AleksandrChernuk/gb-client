import { InitiatePaymentInterface } from '@/types/payment.types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type OrderResultState = {
  isHydrated: boolean;
  initiatePayment: InitiatePaymentInterface | null;
};

export type OrderResultActions = {
  setInitiatePayment: (data: InitiatePaymentInterface) => void;
};

export type OrderResultStore = OrderResultState & OrderResultActions;

export const useOrderResult = create<OrderResultStore>()(
  immer(
    persist(
      (set) => ({
        isHydrated: false,
        initiatePayment: null,
        setInitiatePayment: (data) => {
          set((state) => {
            state.initiatePayment = data;
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
