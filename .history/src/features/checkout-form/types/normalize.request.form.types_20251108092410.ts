import { TCheckoutForm } from '@/features/checkout-form/types/checkout.form.types';
import { IRouteResponse } from '@/shared/types/route.types';
import { ICurrentUser } from '@/shared/types/user';

export type TNormalizeParams = {
  fromCityId: number;
  toCityId: number;
  locale: string;
  formData: TCheckoutForm;
  user: ICurrentUser | null;
  route: IRouteResponse;
};
