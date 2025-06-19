import { IRouteResponse } from '@/types/route.types';
import { z } from 'zod';
import { bdaySchema, passportExpirySchema } from '../schemas';
import { FieldConfig } from '../types';

export const first_name: FieldConfig = {
  label: 'first_name',
  type: 'text',
  placeholder: 'first_name_placeholder',
  schema: z.string().min(1, { message: 'required' }),
};

export const last_name: FieldConfig = {
  label: 'last_name',
  type: 'text',
  placeholder: 'last_name_placeholder',
  schema: z.string().min(1, { message: 'required' }),
};

export const discount = (currentTicket: IRouteResponse | null): FieldConfig => {
  return {
    label: 'discounts',
    type: 'discount',
    placeholder: 'discounts_placeholder',
    options: (currentTicket?.details?.discounts || []).map((d) => ({
      value: d.id ?? '',
      label: `${d.description || d.name}`,
      discount_description: d.description ? d.description : undefined,
      discount_percent: d.percent ? `${d.percent}` : undefined,
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

export const document_type: FieldConfig = {
  label: 'document_type',
  type: 'select',
  placeholder: 'document_type_placeholder',
  translateOptions: true,
  options: [
    { value: 'UNKNOWN', label: 'document_type_infobus.unknown' },
    { value: 'PASSPORT', label: 'document_type_infobus.passport' },
    { value: 'SAILORS_PASSPORT', label: 'document_type_infobus.sailors_passport' },
    { value: 'BIRTH_CERTIFICATE', label: 'document_type_infobus.birth_certificate' },
  ],
  schema: z.string().min(1, { message: 'required' }),
};

// export const document_type_octobus: FieldConfig = {
//   label: 'document_type',
//   type: 'select',
//   placeholder: 'document_type_placeholder',
//   translateOptions: true,
//   options: [
//     { value: 'UNKNOWN', label: 'document_type_infobus.unknown' },
//     { value: 'PASSPORT', label: 'document_type_infobus.passport' },
//     { value: 'MILITARY_ID', label: 'document_type_infobus.military_id' },
//     { value: 'FOREIGN_DOCUMENT', label: 'document_type_infobus.foreign_document' },
//     { value: 'TRAVEL_PASSPORT', label: 'document_type_infobus.travel_passport' },
//     { value: 'SAILORS_PASSPORT', label: 'document_type_infobus.sailors_passport' },
//     { value: 'BIRTH_CERTIFICATE', label: 'document_type_infobus.birth_certificate' },
//     { value: 'DIPLOMATIC_PASSPORT', label: 'document_type_infobus.diplomatic_passport' },
//   ],
//   schema: z.string().min(1, { message: 'required' }),
// };

export const document_number: FieldConfig = {
  label: 'document_number',
  type: 'text',
  placeholder: 'document_number_placeholder',
  schema: z.string().min(1, { message: 'required' }),
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
  schema: z.string().min(1, { message: 'required' }),
};

export const expiryDate = (currentTicket: IRouteResponse | null): FieldConfig => {
  {
    return {
      label: 'expiry_date',
      type: 'date',
      placeholder: 'expiry_date_placeholder',
      schema: passportExpirySchema(new Date(currentTicket?.departure.date_time || new Date())),
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
