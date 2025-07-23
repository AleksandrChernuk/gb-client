import { ProviderConfig } from './types';
import { IRouteResponse } from '@/types/route.types';

import {
  bday,
  citizenship,
  discount,
  documentNumber,
  documentType,
  expiryDate,
  firstName,
  gender,
  lastName,
  middlename,
} from './config.list';
import { FIELDS } from './constans';

const infobusConfig = (currentTicket: IRouteResponse | null): ProviderConfig => {
  const hasDiscounts = !!currentTicket?.details?.discounts?.length;

  return {
    required: [
      FIELDS.firstName,
      FIELDS.lastName,
      ...(currentTicket?.details?.needMiddlename ? [FIELDS.middlename] : []),
      ...(hasDiscounts ? [FIELDS.discount, FIELDS.bday] : []),
      ...(currentTicket?.details?.needCitizenship ? [FIELDS.citizenship] : []),
      ...(currentTicket?.details?.needDoc ? [FIELDS.documentType, FIELDS.documentNumber] : []),
      ...(currentTicket?.details?.needDocExpireDate ? [FIELDS.expiryDate] : []),
      ...(currentTicket?.details?.needGender ? [FIELDS.gender] : []),
    ],
    fields: {
      firstName,
      lastName,
      ...(currentTicket?.details?.needMiddlename
        ? {
            middlename,
          }
        : {}),
      ...(currentTicket?.details?.discounts?.length
        ? {
            discount: discount(currentTicket),
            bday,
          }
        : {}),
      ...(currentTicket?.details?.needCitizenship
        ? {
            citizenship,
          }
        : {}),
      ...(currentTicket?.details?.needDoc
        ? {
            documentType,
            documentNumber,
          }
        : {}),
      ...(currentTicket?.details?.needDocExpireDate
        ? {
            expiryDate: expiryDate(currentTicket),
          }
        : {}),
      ...(currentTicket?.details?.needGender
        ? {
            gender,
          }
        : {}),
    },
  };
};

export default infobusConfig;
