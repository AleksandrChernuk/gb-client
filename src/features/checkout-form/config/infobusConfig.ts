/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRouteResponse } from '@/shared/types/route.types';
import { ProviderConfig } from '@/shared/types/checkot.types';

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
} from '@/shared/utils/checkout.config';

import { FIELDS } from './constans';

const infobusConfig = (currentTicket: IRouteResponse | null): ProviderConfig => {
  const details = currentTicket?.details;
  const hasDiscounts = !!currentTicket?.details?.discounts?.length;

  const isEnabled = (flag?: boolean | string) => flag === true || flag === 'true' || flag === '1';

  const required: string[] = [FIELDS.firstName, FIELDS.lastName];

  if (isEnabled(details?.needMiddlename)) {
    required.push(FIELDS.middlename);
  }
  if (hasDiscounts) {
    required.push(FIELDS.discount);
  }
  if (isEnabled(details?.needBirth)) {
    required.push(FIELDS.bday);
  }
  if (isEnabled(details?.needCitizenship)) {
    required.push(FIELDS.citizenship);
  }
  if (isEnabled(details?.needDoc)) {
    required.push(FIELDS.documentType, FIELDS.documentNumber);
  }
  if (isEnabled(details?.needDocExpireDate)) {
    required.push(FIELDS.expiryDate);
  }
  if (isEnabled(details?.needGender)) {
    required.push(FIELDS.gender);
  }

  // Формируем конфигурацию полей
  const fields: Record<string, any> = {
    firstName,
    lastName,
  };

  if (isEnabled(details?.needMiddlename)) {
    fields.middlename = middlename;
  }
  if (hasDiscounts) {
    fields.discount = discount(currentTicket);
  }
  if (isEnabled(details?.needBirth)) {
    fields.bday = bday;
  }
  if (isEnabled(details?.needCitizenship)) {
    fields.citizenship = citizenship;
  }
  if (isEnabled(details?.needDoc)) {
    fields.documentType = documentType;
    fields.documentNumber = documentNumber;
  }
  if (isEnabled(details?.needDocExpireDate)) {
    fields.expiryDate = expiryDate(currentTicket);
  }
  if (isEnabled(details?.needGender)) {
    fields.gender = gender;
  }

  return {
    required,
    fields,
    needMiddlename: details?.needMiddlename,
    needBirth: details?.needBirth,
    needDoc: details?.needDoc,
    needDocExpireDate: details?.needDocExpireDate,
    needCitizenship: details?.needCitizenship,
    needGender: details?.needGender,
  };
};

export default infobusConfig;
