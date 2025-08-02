import { ProviderConfig } from './types';
import { IRouteResponse } from '@/types/route.types';
import { bday, discount, documentNumber, documentTypeOctobus, firstName, lastName } from './config.list';
import { FIELDS } from './constans';

const octobusConfig = (currentTicket: IRouteResponse | null): ProviderConfig => {
  const details = currentTicket?.details;
  const hasDiscounts = !!details?.discounts?.length;

  const needDoc = details?.needDoc === true || details?.needDoc === 'true' || details?.needDoc === '1';
  const needBirth = details?.needBirth === true || details?.needBirth === 'true' || details?.needBirth === '1';

  return {
    required: [
      FIELDS.firstName,
      FIELDS.lastName,
      ...(hasDiscounts ? [FIELDS.discount] : []),
      ...(needBirth ? [FIELDS.bday] : []),
      ...(needDoc ? [FIELDS.documentType, FIELDS.documentNumber] : []),
    ],
    fields: {
      firstName,
      lastName,

      ...(hasDiscounts ? { discount: discount(currentTicket) } : {}),
      ...(needBirth ? { bday } : {}),
      ...(needDoc
        ? {
            documentType: documentTypeOctobus,
            documentNumber,
          }
        : {}),
    },

    needBirth: details?.needBirth,
    needDoc: details?.needDoc,
  };
};

export default octobusConfig;
