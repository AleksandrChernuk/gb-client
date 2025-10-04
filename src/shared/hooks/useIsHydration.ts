'use client';

import { useEffect, useState } from 'react';

export function useIsHydration() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return { hydrated };
}
