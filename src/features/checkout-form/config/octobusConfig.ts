import { IRouteResponse } from '@/shared/types/route.types';
import { FIELDS } from './constans';
import { ProviderConfig } from '@/shared/types/checkot.types';
import { bday, discount, firstName, lastName } from '@/shared/utils/checkout.config';

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
