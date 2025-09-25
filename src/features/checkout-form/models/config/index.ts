import { IRouteResponse } from '@/shared/types/route.types';
import { ProviderConfig } from '@/shared/types/checkot.types';
import octobusConfig from './octobusConfig';
import infobusConfig from './infobusConfig';
import defaultConfig from './defaultConfig';
import { providersList } from '@/shared/configs/providers';

export function getProviderConfigByName(currentTicket: IRouteResponse | null): ProviderConfig {
  switch (currentTicket?.providerName) {
    case providersList.OCTOBUS:
      return octobusConfig(currentTicket);

    case providersList.INFOBUS:
      return infobusConfig(currentTicket);

    default:
      return defaultConfig(currentTicket);
  }
}
