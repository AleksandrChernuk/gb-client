import defaultConfig from '@/features/checkout-form/config/defaultConfig';
import infobusConfig from '@/features/checkout-form/config/infobusConfig';
import octobusConfig from '@/features/checkout-form/config/octobusConfig';
import { providersList } from '@/shared/configs/providers';
import { ProviderConfig } from '@/shared/types/checkot.types';
import { IRouteResponse } from '@/shared/types/route.types';

export function getProviderConfigByName(currentTicket: IRouteResponse | null): ProviderConfig {
  const providerName = currentTicket?.providerName;

  switch (providerName) {
    case providersList.OCTOBUS:
      return octobusConfig(currentTicket);

    case providersList.INFOBUS:
      return infobusConfig(currentTicket);

    default:
      return defaultConfig(currentTicket);
  }
}
