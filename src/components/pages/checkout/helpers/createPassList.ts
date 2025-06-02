/* eslint-disable @typescript-eslint/no-explicit-any */

import { ProviderConfig } from './providerConfig/types';

export function createEmptyPassenger(config: ProviderConfig, isChildren = false) {
  const passenger: Record<string, any> = {};
  for (const field of config.required) {
    if (!config.fields[field]) continue;
    passenger[field] = '';
  }
  passenger.isChildren = isChildren;
  return passenger;
}

export function createPassengers(adultCount: number, childCount: number, providerConfig: ProviderConfig) {
  return Array.from({ length: adultCount + childCount }).map((_, i) =>
    createEmptyPassenger(providerConfig, i >= adultCount),
  );
}
