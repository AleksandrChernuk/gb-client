import { ProviderConfig } from '../types';
import { IRouteResponse } from '@/types/route.types';
import { bday, discount, document_number, document_type_octobus, first_name, last_name } from './config.list';
import { FIELDS } from '../constans';

const octobusConfig = (currentTicket: IRouteResponse | null): ProviderConfig => {
  const hasDiscounts = !!currentTicket?.details?.discounts?.length;

  return {
    required: [
      FIELDS.first_name,
      FIELDS.last_name,
      FIELDS.document_type,
      FIELDS.document_number,
      ...(hasDiscounts ? [FIELDS.discount, FIELDS.bday] : []),
    ],
    fields: {
      first_name,
      last_name,
      ...(hasDiscounts
        ? {
            discount: discount(currentTicket),
            bday,
            document_type_octobus,
            document_number,
          }
        : {}),
    },
  };
};

export default octobusConfig;
