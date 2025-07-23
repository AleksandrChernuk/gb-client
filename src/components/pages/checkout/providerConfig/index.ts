import { providersList } from '@/constans/providers';
import { IRouteResponse } from '@/types/route.types';
import { ProviderConfig } from './types';
import octobusConfig from './octobusConfig';
import infobusConfig from './infobusConfig';
import defaultConfig from './defaultConfig';

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
