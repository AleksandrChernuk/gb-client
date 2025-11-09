import { IRouteResponse } from '@/shared/types/route.types';
import { FIELDS } from '@/features/checkout-form/types/fields.types';
import { ProviderConfig } from '@/shared/types/checkot.types';
import {
  bday,
  citizenship,
  discount,
  expiryDate,
  firstName,
  gender,
  lastName,
  middlename,
  documentType,
} from '@/features/checkout-form/lib/providerFormConfig/FieldsConfig';

const octobusConfig = (currentTicket: IRouteResponse | null): ProviderConfig => {
  const details = currentTicket?.details;
  const hasDiscounts = !!details?.discounts?.length;

  return {
    required: [
      FIELDS.firstName,
      FIELDS.lastName,
      ...(hasDiscounts || !!details?.automaticDiscountId ? [FIELDS.documentType] : []),
      ...(hasDiscounts ? [FIELDS.discount, FIELDS.bday] : []),
    ],
    fields: {
      firstName: firstName(true),
      lastName: lastName(true),
      ...(hasDiscounts || !!details?.automaticDiscountId ? { documentType } : {}),
      ...(details?.needMiddlename ? { middlename } : {}),
      ...(hasDiscounts ? { discount: discount(currentTicket), bday } : {}),
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
    automaticDiscount: !!details?.automaticDiscountId,
    requireBdayForDiscount: true,
  };
};

export default octobusConfig;
