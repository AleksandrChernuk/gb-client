import { FIELDS } from '@/features/checkout-form/config/constans';
import { ProviderConfig } from '@/shared/types/checkot.types';
import { IRouteResponse } from '@/shared/types/route.types';
import { bday, discount, firstName, lastName } from '@/shared/utils/checkout.config';
import { isEmptyDiscounts } from '@/shared/utils/isEmptyDiscounts';

const defaultConfig = (currentTicket: IRouteResponse | null): ProviderConfig => {
  const discounts = currentTicket?.details?.discounts ?? [];
  const isTranstempoWithSingleDiscount =
    isEmptyDiscounts(discounts) && !['1210', '1211'].some((id) => discounts.map((el) => el.id).includes(id));

  const showBlock = isTranstempoWithSingleDiscount;

  return {
    required: [FIELDS.firstName, FIELDS.lastName, ...(showBlock ? ['discount', 'bday'] : [])],
    fields: {
      firstName,
      lastName,
      ...(showBlock
        ? {
            discount: discount(currentTicket),
            bday,
          }
        : {}),
    },
  };
};

export default defaultConfig;
