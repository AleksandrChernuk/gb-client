// carrier.helpers.ts
import { ProviderName } from '@/features/router-carier-label/providers.constants';
import { CARRIER_REGISTRY } from './carriers.registry';

export const getCarrierLogo = (carrierName: string, provider?: ProviderName) => {
  const normalized = carrierName.toLowerCase().trim();

  for (const item of CARRIER_REGISTRY) {
    if (provider && item.provider && item.provider !== provider) continue;

    if (item.match(normalized)) {
      return {
        src: item.logoSrc,
        alt: item.alt,
      };
    }
  }

  return undefined;
};
