import { IRouteResponse } from '@/shared/types/route.types';

export interface IProviderRoutes {
  providerName: string;
  routes: IRouteResponse[] | [];
  error?: string;
  combineRoutes?: IRouteResponse[][] | [];
}
