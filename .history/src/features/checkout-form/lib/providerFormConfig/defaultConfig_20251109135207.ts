import { ProviderConfig } from '@/shared/types/checkot.types';
import { IRouteResponse } from '@/shared/types/route.types';
import { bday, discount, firstName, lastName } from '@/features/checkout-form/lib/providerFormConfig/FieldsConfig';
import { isEmptyDiscounts } from '@/shared/utils/isEmptyDiscounts';
import { FIELDS } from '@/features/checkout-form/types/fields.types';

const defaultConfig = (currentTicket: IRouteResponse | null): ProviderConfig => {
  const details = currentTicket?.details;
  const discounts = details?.discounts ?? [];
  const provider = currentTicket?.providerName.toLowerCase();

  const hideForTranstempo = provider === 'transtempo' && Array.isArray(discounts) && discounts.length === 1;

  const showBlock = !isEmptyDiscounts(discounts) && !hideForTranstempo && provider === 'euroclub';

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
