import { useCallback } from 'react';

export const useSetSearchParams = () => {
  return useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(location.hash.slice(1));

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    location.hash = params.toString();
  }, []);
};
