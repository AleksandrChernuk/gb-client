import { IRouteResponse } from '@/shared/types/route.types';
import { z } from 'zod';
import { FieldConfig } from '../../../shared/types/checkot.types';
import { bdaySchema, passportExpirySchema } from '../config/schemas';
import { isCleanInput } from '@/shared/validation/schemas.constans';

const latinRegex = /^[A-Za-z'’\s-]+$/;
const bothRegex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ'’\s-]+$/u;

export const firstName = (canCyrillicOrderData?: boolean): FieldConfig => {
  const alphabet = canCyrillicOrderData ? 'any' : 'latin';
  const regex = canCyrillicOrderData ? bothRegex : latinRegex;

  return {
    label: 'first_name',
    type: 'text',
    placeholder: 'first_name_placeholder',
    alphabet,
    schema: z
      .string()
      .min(2, { message: 'required' })
      .max(50, { message: 'too_long' })
      .regex(regex, { message: 'only_latin_allowed' }),
  };
};

export const lastName = (canCyrillicOrderData?: boolean): FieldConfig => {
  const alphabet = canCyrillicOrderData ? 'any' : 'latin';
  const regex = canCyrillicOrderData ? bothRegex : latinRegex;

  return {
    label: 'last_name',
    type: 'text',
    placeholder: 'last_name_placeholder',
    alphabet,
    schema: z
      .string()
      .min(2, { message: 'required' })
      .max(50, { message: 'too_long' })
      .regex(regex, { message: 'only_latin_allowed' }),
  };
};

export const discount = (currentTicket: IRouteResponse | null): FieldConfig => {
  return {
    label: 'discounts',
    type: 'discount',
    placeholder: 'discounts_placeholder',
    options: (currentTicket?.details?.discounts || [])
      .filter((d) => d.id !== '1210' && d.id !== '1211')
      .map((d) => ({
        value: d.id ?? '',
        label: d.name && d.description ? `${d.name}, ${d.description}` : d.name || d.description || '',
        discountDescription: d.description ? d.description : undefined,
        discountPercent: d.percent ? `${d.percent}` : undefined,
      })),

    schema: z.string().optional(),
  };
};

export const bday: FieldConfig = {
  label: 'bday',
  type: 'date',
  placeholder: 'bday_placeholder',
  schema: bdaySchema.optional(),
};

export const documentType: FieldConfig = {
  label: 'document_type',
  type: 'select',
  placeholder: 'document_type_placeholder',
  translateOptions: true,
  options: [
    { value: '8', label: 'document_type_infobus.unknown' },
    { value: '2', label: 'document_type_infobus.passport' },
    { value: '4', label: 'document_type_infobus.military_id' },
    { value: '1', label: 'document_type_infobus.foreign_document' },
    { value: '6', label: 'document_type_infobus.travel_passport' },
    { value: '5', label: 'document_type_infobus.sailors_passport' },
    { value: '3', label: 'document_type_infobus.birth_certificate' },
    { value: '7', label: 'document_type_infobus.diplomatic_passport' },
  ],
  schema: z.string().min(1, { message: 'required' }),
};

export const documentNumber: FieldConfig = {
  label: 'document_number',
  type: 'text',
  placeholder: 'document_number_placeholder',
  schema: z.string().min(1, { message: 'required' }).refine(isCleanInput, { message: 'suspicious_input' }),
};

export const citizenship: FieldConfig = {
  label: 'citizenship_label',
  type: 'citizenship',
  placeholder: 'citizenship_placeholder',
  schema: z.string().min(1, { message: 'required' }),
};

export const middlename: FieldConfig = {
  label: 'middlename',
  type: 'text',
  placeholder: 'middlename_placeholder',
  schema: z.string().min(1, { message: 'required' }).refine(isCleanInput, { message: 'suspicious_input' }),
};

export const expiryDate = (currentTicket: IRouteResponse | null): FieldConfig => {
  {
    return {
      label: 'expiry_date',
      type: 'date',
      placeholder: 'expiry_date_placeholder',
      schema: passportExpirySchema(new Date(currentTicket?.departure.dateTime || new Date())),
    };
  }
};

export const gender: FieldConfig = {
  label: 'gender_label',
  type: 'select',
  translateOptions: true,
  options: [
    { value: 'M', label: 'MALE' },
    { value: 'F', label: 'FEMALE' },
  ],
  schema: z.string().min(1, { message: 'required' }),
};

export type TPassengersProps = {
  adult?: string;
  childrenPass?: string;
};

export type Passenger = {
  firstName: '';
  isChildren: boolean;
  lastName: '';
  price: number;
  bday?: string;
  discount?: string;
  discountDescription?: string;
  discountId?: string;
  discountPercent?: string;
  documentType?: string;
  expiryDate?: string;
  gender?: 'M' | 'F';
  citizenship?: string;
  middlename?: string;
  documentNumber?: string;
};
