import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { IRouteResponse } from '@/shared/types/route.types';
import { IFreeSeats } from '@/shared/types/free.seats.interface';

type TSelectedTicket = {
  route: IRouteResponse;
  adult: number;
  children: number;
};

export type useSelectedTicketsStore = {
  isHydrated: boolean;
  selectedTicket: TSelectedTicket | null;
  loadingTicketId: string | null;
  setSelectedTicket: (route: TSelectedTicket) => void;
  updateRouteSeats: (freeSeats: IFreeSeats[]) => void;

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

          setSelectedTicket: (route: TSelectedTicket) => {
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

          updateRouteSeats: (freeSeats: IFreeSeats[]) => {
            set((state) => {
              if (!state.selectedTicket || !state.selectedTicket.route) return;

              if (state.selectedTicket.route.details) {
                state.selectedTicket.route.details.freeSeatsMap = freeSeats;
              }
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
