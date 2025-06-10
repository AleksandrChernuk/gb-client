import { providersList } from '@/constans/providers';
import { IRouteResponse } from '@/types/route.types';
import { ProviderConfig } from './types';
import octobusConfig from './configs/octobusConfig';
import infobusConfig from './configs/infobusConfig';
import defaultConfig from './configs/defaultConfig';

export function getProviderConfigByName(currentTicket: IRouteResponse | null): ProviderConfig {
  switch (currentTicket?.provider_name) {
    case providersList.OCTOBUS:
      return octobusConfig(currentTicket);

    case providersList.INFOBUS:
      return infobusConfig(currentTicket);

    default:
      return defaultConfig(currentTicket);
  }
}
