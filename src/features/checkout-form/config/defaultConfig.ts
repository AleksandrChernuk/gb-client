/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRouteResponse } from '@/shared/types/route.types';
import { FIELDS } from './constans';
import { bday, discount, firstName, lastName } from '@/shared/utils/checkout.config';
import { isEmptyDiscounts } from '@/shared/utils/isEmptyDiscounts';
import { ProviderConfig } from '@/shared/types/checkot.types';

const defaultConfig = (currentTicket: IRouteResponse | null): ProviderConfig => {
  const details = currentTicket?.details;
  const discounts = details?.discounts ?? [];

  const isTranstempoWithSingleDiscount =
    isEmptyDiscounts(discounts) && !['1210', '1211'].some((id) => discounts.map((el) => el.id).includes(id));

  const showDiscountBlock = !isTranstempoWithSingleDiscount;

  const required: string[] = [FIELDS.firstName, FIELDS.lastName];

  if (showDiscountBlock) {
    required.push(FIELDS.discount, FIELDS.bday);
  }

  const fields: Record<string, any> = {
    firstName,
    lastName,
  };

  if (showDiscountBlock) {
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

export default defaultConfig;
