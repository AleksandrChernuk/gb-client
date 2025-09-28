import { ICurrentUser } from '@/shared/types/user';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IUserStore {
  currentUser: ICurrentUser | null;
  setUserStore: (currentUser: ICurrentUser) => void;
  clearUserStore: () => void;
}

export const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      currentUser: null,
      setUserStore: (currentUser) => set({ currentUser }),
      clearUserStore: () => set({ currentUser: null }),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
