import { IRouteResponse } from '@/shared/types/route.types';
import { ICurrentUser } from '@/shared/types/user';

export type TNormalizeParams = {
  fromCityId: number;
  toCityId: number;
  locale: string;
  formData: FormData;
  user: ICurrentUser | null;
  route: IRouteResponse;
};
