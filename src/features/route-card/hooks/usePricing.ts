'use client';

import { useMemo } from 'react';

export const usePricing = (basePrice: number, voyager: number) => {
  return useMemo(
    () => ({
      singlePrice: basePrice,
      totalPrice: basePrice * voyager,
      passengerCount: voyager,
    }),
    [basePrice, voyager],
  );
};
