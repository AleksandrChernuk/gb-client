/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

export function useHandleSelect<TArgs extends any[] = any[], TResult = void>(
  asyncAction: (...args: TArgs) => Promise<TResult>,
  onError?: (e: any) => void,
) {
  const [loading, setLoading] = useState(false);

  const handleSelect = async (...args: TArgs) => {
    setLoading(true);
    try {
      await asyncAction(...args);
    } catch (e) {
      if (onError) onError(e);
      else console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return { handleSelect, loading };
}
