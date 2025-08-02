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
  const details = currentTicket?.details;

  return {
    required: [
      FIELDS.firstName,
      FIELDS.lastName,
      ...(details?.needMiddlename ? [FIELDS.middlename] : []),
      ...(hasDiscounts ? [FIELDS.discount] : []),
      ...(details?.needBirth ? [FIELDS.bday] : []),
      ...(details?.needCitizenship ? [FIELDS.citizenship] : []),
      ...(details?.needDoc ? [FIELDS.documentType, FIELDS.documentNumber] : []),
      ...(details?.needDocExpireDate ? [FIELDS.expiryDate] : []),
      ...(details?.needGender ? [FIELDS.gender] : []),
    ],
    fields: {
      firstName,
      lastName,
      ...(details?.needMiddlename ? { middlename } : {}),
      ...(hasDiscounts ? { discount: discount(currentTicket) } : {}),
      ...(details?.needBirth ? { bday } : {}),
      ...(details?.needCitizenship ? { citizenship } : {}),
      ...(details?.needDoc ? { documentType, documentNumber } : {}),
      ...(details?.needDocExpireDate ? { expiryDate: expiryDate(currentTicket) } : {}),
      ...(details?.needGender ? { gender } : {}),
    },
    needMiddlename: details?.needMiddlename,
    needBirth: details?.needBirth,
    needDoc: details?.needDoc,
    needDocExpireDate: details?.needDocExpireDate,
    needCitizenship: details?.needCitizenship,
    needGender: details?.needGender,
  };
};

export default infobusConfig;
