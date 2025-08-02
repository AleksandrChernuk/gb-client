/* eslint-disable @typescript-eslint/no-explicit-any */

import { ProviderConfig } from '../providerConfig/types';

export function createEmptyPassenger(config: ProviderConfig, isChildren = false, price: number) {
  const passengers: Record<string, any> = {};
  for (const field of config.required) {
    if (!config.fields[field]) continue;

    passengers[field] = '';
  }
  passengers.isChildren = isChildren;
  passengers.price = price;
  passengers.discountId = '';
  passengers.discountDescription = '';
  passengers.discountPercent = '';

  return passengers;
}

export function createPassengers(
  adultCount: number,
  childCount: number,
  providerConfig: ProviderConfig,
  price: number,
) {
  return Array.from({ length: adultCount + childCount }).map((_, i) =>
    createEmptyPassenger(providerConfig, i >= adultCount, Math.round(price)),
  );
}
