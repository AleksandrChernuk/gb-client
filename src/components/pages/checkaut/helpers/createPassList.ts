/* eslint-disable @typescript-eslint/no-explicit-any */

import { ProviderConfig } from './providerFieldsConfig';

export function createEmptyPassenger(config: ProviderConfig, isChildren = false) {
  const passenger: Record<string, any> = {};
  for (const field of [...config.required, ...config.optional]) {
    const fieldCfg = config.fields[field];
    if (!fieldCfg) continue;
    if (fieldCfg.type === 'group') {
      passenger[field] = {};
      for (const sub in fieldCfg.fields) {
        passenger[field][sub] = '';
      }
    } else {
      passenger[field] = '';
    }
  }

  passenger.isChildren = isChildren;
  return passenger;
}

export function createPassengers(adultCount: number, childCount: number, providerConfig: ProviderConfig) {
  return Array.from({ length: adultCount + childCount }).map((_, i) =>
    createEmptyPassenger(providerConfig, i >= adultCount),
  );
}
