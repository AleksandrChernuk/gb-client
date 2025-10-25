'use client';

import { useMemo } from 'react';

export const usePricing = (basePrice: number, voyager: number) => {
  return useMemo(
    () => ({
      singlePrice: Math.floor(basePrice || 0),
      totalPrice: Math.floor(basePrice || 0) * voyager,
      passengerCount: voyager,
    }),
    [basePrice, voyager],
  );
};
