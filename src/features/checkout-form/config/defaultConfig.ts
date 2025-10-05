import { FIELDS } from '@/features/checkout-form/config/constans';
import { ProviderConfig } from '@/shared/types/checkot.types';
import { IRouteResponse } from '@/shared/types/route.types';
import { bday, discount, firstName, lastName } from '@/features/checkout-form/helpers/checkout.config';
import { isEmptyDiscounts } from '@/shared/utils/isEmptyDiscounts';

const defaultConfig = (currentTicket: IRouteResponse | null): ProviderConfig => {
  const details = currentTicket?.details;
  const discounts = details?.discounts ?? [];
  const canCyrillic = details?.canCyrillicOrderdata ?? true;

  const showBlock = !isEmptyDiscounts(discounts);

  return {
    required: [FIELDS.firstName, FIELDS.lastName, ...(showBlock ? [FIELDS.discount, FIELDS.bday] : [])],
    fields: {
      firstName: firstName(canCyrillic),
      lastName: lastName(canCyrillic),
      ...(showBlock && {
        discount: discount(currentTicket),
        bday,
      }),
    },
  };
};

export default defaultConfig;
