import { IProviderRoutes } from '@/shared/types/providerRoutes-interface';
import { IRouteResponse } from '@/shared/types/route.types';

export type TAdaptedRoute =
  | {
      type: 'single';
      provider: string;
      ticketId: string;
      data: IRouteResponse;
    }
  | {
      type: 'combined';
      provider: string;
      data: IRouteResponse[];
    }
  | {
      type: 'error';
      provider: string;
      message: string;
    };

export const adaptRoutesForRender = (providers: IProviderRoutes[] | undefined): TAdaptedRoute[] => {
  const result: TAdaptedRoute[] = [];

  if (!providers) return [];

  providers.forEach((provider) => {
    const { providerName, routes, combineRoutes, error } = provider;

    if (routes?.length) {
      routes.forEach((r) => {
        result.push({
          type: 'single',
          provider: providerName,
          ticketId: r.ticketId,
          data: r,
        });
      });
    }

    if (combineRoutes?.length) {
      combineRoutes.forEach((group) => {
        result.push({
          type: 'combined',
          provider: providerName,
          data: group,
        });
      });
    }

    if (error) {
      result.push({
        type: 'error',
        provider: providerName,
        message: error,
      });
    }
  });

  return result;
};
