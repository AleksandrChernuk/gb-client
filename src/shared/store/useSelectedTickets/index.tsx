import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { IRouteResponse } from '@/shared/types/route.types';

export type useSelectedTicketsStore = {
  isHydrated: boolean;
  selectedTicket: IRouteResponse | null;
  loadingTicketId: string | null;
  setSelectedTicket: (route: IRouteResponse) => void;
  setLoading: (ticketId: string | null) => void;
  resetSelectedTicket: () => void;
};

export const useSelectedTickets = create<useSelectedTicketsStore>()(
  devtools(
    immer(
      persist(
        (set) => ({
          isHydrated: false,
          selectedTicket: null,
          loadingTicketId: null,

          setSelectedTicket: (route: IRouteResponse) => {
            set((state) => {
              state.selectedTicket = route;
              state.loadingTicketId = null;
            });
          },

          setLoading: (ticketId: string | null) => {
            set((state) => {
              state.loadingTicketId = ticketId;
            });
          },

          resetSelectedTicket: () => {
            set((state) => {
              state.selectedTicket = null;
              state.loadingTicketId = null;
            });
          },
        }),
        {
          name: 'selected-tickets',
          storage: createJSONStorage(() => sessionStorage),
          onRehydrateStorage: () => (state) => {
            if (state) {
              state.isHydrated = true;
            }
          },
        },
      ),
    ),
  ),
);
