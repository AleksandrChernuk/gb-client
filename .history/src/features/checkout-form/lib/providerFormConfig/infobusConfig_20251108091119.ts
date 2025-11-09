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
} from '@/features/checkout-form/lib/providerFormConfig/FieldsConfig';
import { ProviderConfig } from '@/shared/types/checkot.types';

const infobusConfig = (currentTicket: IRouteResponse | null): ProviderConfig => {
  const details = currentTicket?.details;

  const hasDiscounts = !!details?.discounts?.length;
  const canCyrillic = details?.canCyrillicOrderdata ?? false;

  // надёжная нормализация needBirth
  const needBirth =
    details?.needBirth === true ||
    details?.needBirth === '1' ||
    (typeof details?.needBirth === 'number' && details?.needBirth === 1);
  console.log('needBirth', needBirth);
  // показывать дату рождения, если:
  // 1) needBirth = true, или
  // 2) есть скидки

  return {
    required: [
      FIELDS.firstName,
      FIELDS.lastName,
      ...(details?.needMiddlename ? [FIELDS.middlename] : []),
      ...(hasDiscounts ? [FIELDS.discount] : []),
      ...(details?.needCitizenship ? [FIELDS.citizenship] : []),
      ...(details?.needDoc ? [FIELDS.documentType, FIELDS.documentNumber] : []),
      ...(details?.needDocExpireDate ? [FIELDS.expiryDate] : []),
      ...(details?.needGender ? [FIELDS.gender] : []),
      ...(needBirth ? [FIELDS.bday] : []),
    ],

    fields: {
      firstName: firstName(canCyrillic),
      lastName: lastName(canCyrillic),
      ...(details?.needMiddlename ? { middlename } : {}),
      ...(needBirth ? { bday } : {}),
      ...(hasDiscounts ? { discount: discount(currentTicket) } : {}),
      ...(details?.needCitizenship ? { citizenship } : {}),
      ...(details?.needDoc ? { documentType, documentNumber } : {}),
      ...(details?.needDocExpireDate ? { expiryDate: expiryDate(currentTicket) } : {}),
      ...(details?.needGender ? { gender } : {}),
    },

    needMiddlename: details?.needMiddlename,
    needBirth,
    needDoc: details?.needDoc,
    needDocExpireDate: details?.needDocExpireDate,
    needCitizenship: details?.needCitizenship,
    needGender: details?.needGender,
    requireBdayForDiscount: false,
  };
};

export default infobusConfig;
