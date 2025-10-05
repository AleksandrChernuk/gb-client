import { IRouteResponse } from '@/shared/types/route.types';
import { FIELDS } from './constans';
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
import { ProviderConfig } from '@/shared/types/checkot.types';

const infobusConfig = (currentTicket: IRouteResponse | null): ProviderConfig => {
  const hasDiscounts = !!currentTicket?.details?.discounts?.length;
  const details = currentTicket?.details;

  const canCyrillic = details?.canCyrillicOrderdata ?? false;

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
      firstName: firstName(canCyrillic),
      lastName: lastName(canCyrillic),
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
