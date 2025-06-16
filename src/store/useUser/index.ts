import { create } from 'zustand';
import { persist, StorageValue } from 'zustand/middleware';
import { IUserStore } from './types';

export const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      currentUser: null,
      setUserStore: (currentUser) => set({ currentUser }),
      clearUserStore: () => set({ currentUser: null }),
    }),
    {
      name: 'user-store',
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          if (!item) {
            return null;
          }

          try {
            return JSON.parse(item) as StorageValue<IUserStore>;
          } catch (error) {
            console.warn(`[Storage] Failed to parse JSON for key: ${name}. Removing corrupted entry.`, error);
            localStorage.removeItem(name);
            return null;
          }
        },

        setItem: (name, value) => {
          try {
            localStorage.setItem(name, JSON.stringify(value));
          } catch (error) {
            console.error(`[Storage] Failed to store item: ${name}`, error);
          }
        },

        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    },
  ),
);
