import type { ElementType } from 'react';
import { CARRIER_REGISTRY } from './carriers.registry';

export const getCarrierLogo = (carrierName: string): ElementType | undefined => {
  const normalized = carrierName.toLowerCase().trim();

  for (const item of CARRIER_REGISTRY) {
    if (!item) continue;

    if (item.match(normalized)) {
      return item.Logo;
    }
  }

  return undefined;
};
