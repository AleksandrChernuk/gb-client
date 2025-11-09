import { FIELDS } from '@/features/checkout-form/lib/providerFormConfig/constans';
import { ProviderConfig } from '@/shared/types/checkot.types';
import { IRouteResponse } from '@/shared/types/route.types';
import { bday, discount, firstName, lastName } from '@/features/checkout-form/lib/providerFormConfig/checkout.config';
import { isEmptyDiscounts } from '@/shared/utils/isEmptyDiscounts';

const defaultConfig = (currentTicket: IRouteResponse | null): ProviderConfig => {
  const details = currentTicket?.details;
  const discounts = details?.discounts ?? [];
  const provider = currentTicket?.providerName;

  const hideForTranstempo = provider === 'TRANSTEMPO' && Array.isArray(discounts) && discounts.length === 1;

  const showBlock = !isEmptyDiscounts(discounts) && !hideForTranstempo && provider === 'EUROCLUB';

  return {
    required: [FIELDS.firstName, FIELDS.lastName, ...(showBlock ? [FIELDS.discount, FIELDS.bday] : [])],
    fields: {
      firstName: firstName(true),
      lastName: lastName(true),
      ...(showBlock && {
        discount: discount(currentTicket),
        bday,
      }),
    },
    requireBdayForDiscount: true,
  };
};

export default defaultConfig;
