import { ProviderConfig } from './types';
import { IRouteResponse } from '@/types/route.types';
import { FIELDS } from './constans';
import { bday, discount, firstName, lastName } from './config.list';
import { isEmptyDiscounts } from '@/utils/isEmptyDiscounts';

const defaultConfig = (currentTicket: IRouteResponse | null): ProviderConfig => {
  const details = currentTicket?.details;

  const discounts = details?.discounts ?? [];
  const isTranstempoWithSingleDiscount = currentTicket?.providerName === 'TRANSTEMPO' && isEmptyDiscounts(discounts);

  const needBirth = isTranstempoWithSingleDiscount || details?.needBirth;

  return {
    required: [
      FIELDS.firstName,
      FIELDS.lastName,
      ...(isTranstempoWithSingleDiscount ? [FIELDS.discount] : []),
      ...(needBirth ? [FIELDS.bday] : []),
    ],
    fields: {
      firstName,
      lastName,
      ...(isTranstempoWithSingleDiscount ? { discount: discount(currentTicket) } : {}),
      ...(needBirth ? { bday } : {}),
    },
    needBirth,
  };
};

export default defaultConfig;
