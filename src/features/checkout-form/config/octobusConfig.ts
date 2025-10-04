/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRouteResponse } from '@/shared/types/route.types';
import { FIELDS } from './constans';
import { ProviderConfig } from '@/shared/types/checkot.types';
import { bday, discount, firstName, lastName } from '@/shared/utils/checkout.config';

const octobusConfig = (currentTicket: IRouteResponse | null): ProviderConfig => {
  const details = currentTicket?.details;
  const hasDiscounts = !!details?.discounts?.length;

  const required: string[] = [FIELDS.firstName, FIELDS.lastName];

  if (hasDiscounts) {
    required.push(FIELDS.discount, FIELDS.bday);
  }

  const fields: Record<string, any> = {
    firstName,
    lastName,
  };

  if (hasDiscounts) {
    fields.discount = discount(currentTicket);
    fields.bday = bday;
  }

  return {
    required,
    fields,
    needBirth: details?.needBirth,
    needDoc: details?.needDoc,
    needDocExpireDate: details?.needDocExpireDate,
    needCitizenship: details?.needCitizenship,
    needGender: details?.needGender,
    needMiddlename: details?.needMiddlename,
  };
};

export default octobusConfig;
