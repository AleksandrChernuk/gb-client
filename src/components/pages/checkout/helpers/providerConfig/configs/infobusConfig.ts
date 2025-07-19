import { ProviderConfig } from '../types';
import { IRouteResponse } from '@/types/route.types';

import {
  bday,
  citizenship,
  discount,
  document_number,
  document_type,
  expiryDate,
  first_name,
  gender,
  last_name,
  middlename,
} from './config.list';
import { FIELDS } from '../constans';

const infobusConfig = (currentTicket: IRouteResponse | null): ProviderConfig => {
  const hasDiscounts = !!currentTicket?.details?.discounts?.length;

  return {
    required: [
      FIELDS.first_name,
      FIELDS.last_name,
      ...(currentTicket?.details?.needMiddlename ? [FIELDS.middlename] : []),
      ...(hasDiscounts ? [FIELDS.discount, FIELDS.bday] : []),
      ...(currentTicket?.details?.needCitizenship ? [FIELDS.citizenship] : []),
      ...(currentTicket?.details?.needDoc ? [FIELDS.document_type, FIELDS.document_number] : []),
      ...(currentTicket?.details?.needDocExpireDate ? [FIELDS.expiryDate] : []),
      ...(currentTicket?.details?.needGender ? [FIELDS.gender] : []),
    ],
    fields: {
      first_name,
      last_name,
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
            document_type,
            document_number,
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
