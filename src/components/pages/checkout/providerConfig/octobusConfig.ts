import { ProviderConfig } from './types';
import { IRouteResponse } from '@/types/route.types';
import { bday, discount, firstName, lastName } from './config.list';
import { FIELDS } from './constans';

const octobusConfig = (currentTicket: IRouteResponse | null): ProviderConfig => {
  const details = currentTicket?.details;
  const hasDiscounts = !!details?.discounts?.length;

  return {
    required: [FIELDS.firstName, FIELDS.lastName, ...(hasDiscounts ? [FIELDS.discount, FIELDS.bday] : [])],
    fields: {
      firstName,
      lastName,

      ...(hasDiscounts ? { discount: discount(currentTicket), bday } : {}),
    },

    needBirth: details?.needBirth,
    needDoc: details?.needDoc,
  };
};

export default octobusConfig;
