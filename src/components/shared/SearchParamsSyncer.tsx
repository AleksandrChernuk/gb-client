'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSearchStore } from '@/store/useSearch';
import { getLocationById } from '@/actions/location.actions';

export default function SearchParamsSyncer() {
  const searchParams = useSearchParams();

  const isHydrated = useSearchStore((state) => state.isHydrated);

  const from = useSearchStore((state) => state.from);
  const to = useSearchStore((state) => state.to);
  const setCity = useSearchStore((state) => state.setCity);

  useEffect(() => {
    if (!isHydrated) return;

    const fromId = searchParams.get('from');
    const toId = searchParams.get('to');

    const fetchIfEmpty = async (cityKey: 'from' | 'to', id: string) => {
      const loc = await getLocationById(Number(id));

      setCity(cityKey, loc);
    };

    if (fromId && !from) {
      console.log('SearchParamsSyncer');

      fetchIfEmpty('from', fromId);
    }
    if (toId && !to) {
      console.log('SearchParamsSyncer');

      fetchIfEmpty('to', toId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated]);

  return null;
}
