'use client';

import { useMemo } from 'react';

export const usePricing = (basePrice: number, adult: number, children: number) => {
  return useMemo(
    () => ({
      singlePrice: Math.floor(basePrice || 0),
      totalPrice: Math.floor(basePrice || 0) * (adult + children),
      passengerCount: adult + children,
    }),
    [basePrice, adult, children],
  );
};
