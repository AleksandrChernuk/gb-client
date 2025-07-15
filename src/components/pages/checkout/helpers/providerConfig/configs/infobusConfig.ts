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
      ...(currentTicket?.details?.need_middlename ? [FIELDS.middlename] : []),
      ...(hasDiscounts ? [FIELDS.discount, FIELDS.bday] : []),
      ...(currentTicket?.details?.need_citizenship ? [FIELDS.citizenship] : []),
      ...(currentTicket?.details?.need_doc ? [FIELDS.document_type, FIELDS.document_number] : []),
      ...(currentTicket?.details?.need_doc_expire_date ? [FIELDS.expiryDate] : []),
      ...(currentTicket?.details?.need_gender ? [FIELDS.gender] : []),
    ],
    fields: {
      first_name,
      last_name,
      ...(currentTicket?.details?.need_middlename
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
      ...(currentTicket?.details?.need_citizenship
        ? {
            citizenship,
          }
        : {}),
      ...(currentTicket?.details?.need_doc
        ? {
            document_type,
            document_number,
          }
        : {}),
      ...(currentTicket?.details?.need_doc_expire_date
        ? {
            expiryDate: expiryDate(currentTicket),
          }
        : {}),
      ...(currentTicket?.details?.need_gender
        ? {
            gender,
          }
        : {}),
    },
  };
};

export default infobusConfig;
