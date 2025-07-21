import { ProviderConfig } from '../types';
import { IRouteResponse } from '@/types/route.types';
import { FIELDS } from '../constans';
import { bday, discount, first_name, last_name } from './config.list';

const defaultConfig = (currentTicket: IRouteResponse | null): ProviderConfig => {
  const hasDiscounts =
    !!currentTicket?.details?.discounts?.length &&
    currentTicket.details.discounts[0].id !== '1210' &&
    currentTicket.details.discounts[0].id !== '1211';

  return {
    required: [FIELDS.first_name, FIELDS.last_name, ...(hasDiscounts ? ['discount', 'bday'] : [])],
    fields: {
      first_name,
      last_name,
      ...(hasDiscounts
        ? {
            discount: discount(currentTicket),
            bday,
          }
        : {}),
    },
  };
};

export default defaultConfig;
