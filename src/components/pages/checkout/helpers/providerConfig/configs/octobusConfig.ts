import { ProviderConfig } from '../types';
import { IRouteResponse } from '@/types/route.types';
import { bday, discount, first_name, last_name } from './config.list';
import { FIELDS } from '../constans';

const octobusConfig = (currentTicket: IRouteResponse | null): ProviderConfig => {
  const hasDiscounts = !!currentTicket?.details?.discounts?.length;

  return {
    required: [FIELDS.first_name, FIELDS.last_name, ...(hasDiscounts ? [FIELDS.discount, FIELDS.bday] : [])],
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

export default octobusConfig;
