import { IRouteResponse } from '@/shared/types/route.types';
import { FIELDS } from './constans';
import { ProviderConfig } from '@/shared/types/checkot.types';
import {
  bday,
  citizenship,
  discount,
  documentNumber,
  expiryDate,
  firstName,
  gender,
  lastName,
  middlename,
  documentType,
} from '@/features/checkout-form/helpers/checkout.config';

const octobusConfig = (currentTicket: IRouteResponse | null): ProviderConfig => {
  const details = currentTicket?.details;
  const hasDiscounts = !!details?.discounts?.length || !details?.automaticDiscountId;

  return {
    required: [
      FIELDS.firstName,
      FIELDS.lastName,
      ...(hasDiscounts ? [FIELDS.documentType, FIELDS.documentNumber] : []),
      ...(hasDiscounts ? [FIELDS.discount, FIELDS.bday] : []),
    ],
    fields: {
      firstName: firstName(true),
      lastName: lastName(true),
      documentType,
      documentNumber,

      ...(hasDiscounts || !!details?.automaticDiscountId ? { documentType, documentNumber } : {}),
      ...(details?.needMiddlename ? { middlename } : {}),
      ...(hasDiscounts ? { discount: discount(currentTicket) } : {}),
      ...(details?.needBirth ? { bday } : {}),
      ...(details?.needCitizenship ? { citizenship } : {}),
      ...(details?.needDocExpireDate ? { expiryDate: expiryDate(currentTicket) } : {}),
      ...(details?.needGender ? { gender } : {}),
    },

    needBirth: details?.needBirth,
    needDoc: details?.needDoc,
    needMiddlename: details?.needMiddlename,
    needDocExpireDate: details?.needDocExpireDate,
    needCitizenship: details?.needCitizenship,
    needGender: details?.needGender,
  };
};

export default octobusConfig;
