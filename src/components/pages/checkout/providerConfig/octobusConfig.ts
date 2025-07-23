import { ProviderConfig } from './types';
import { IRouteResponse } from '@/types/route.types';
import { bday, discount, documentNumber, documentTypeOctobus, firstName, lastName } from './config.list';
import { FIELDS } from './constans';

const octobusConfig = (currentTicket: IRouteResponse | null): ProviderConfig => {
  const hasDiscounts = !!currentTicket?.details?.discounts?.length;

  return {
    required: [
      FIELDS.firstName,
      FIELDS.lastName,
      FIELDS.documentType,
      FIELDS.documentNumber,
      ...(hasDiscounts ? [FIELDS.discount, FIELDS.bday] : []),
    ],
    fields: {
      firstName,
      lastName,
      ...(hasDiscounts
        ? {
            discount: discount(currentTicket),
            bday,
            documentTypeOctobus,
            documentNumber,
          }
        : {}),
    },
  };
};

export default octobusConfig;
