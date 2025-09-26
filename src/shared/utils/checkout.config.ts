import { IRouteResponse } from '@/shared/types/route.types';
import { z } from 'zod';
import { FieldConfig } from '../types/checkot.types';
import { bdaySchema, passportExpirySchema } from '../../features/checkout-form/config/schemas';
import { isCleanInput } from '@/shared/validation/schemas.constans';

export const firstName: FieldConfig = {
  label: 'first_name',
  type: 'text',
  placeholder: 'first_name_placeholder',
  schema: z.string().min(1, { message: 'required' }).refine(isCleanInput, { message: 'suspicious_input' }),
};

export const lastName: FieldConfig = {
  label: 'last_name',
  type: 'text',
  placeholder: 'last_name_placeholder',
  schema: z.string().min(1, { message: 'required' }).refine(isCleanInput, { message: 'suspicious_input' }),
};

export const discount = (currentTicket: IRouteResponse | null): FieldConfig => {
  return {
    label: 'discounts',
    type: 'discount',
    placeholder: 'discounts_placeholder',
    options: (currentTicket?.details?.discounts || [])
      .filter((d) => d.id !== '1210')
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
    { value: 'UNKNOWN', label: 'document_type_infobus.unknown' },
    { value: 'PASSPORT', label: 'document_type_infobus.passport' },
    { value: 'SAILORS_PASSPORT', label: 'document_type_infobus.sailors_passport' },
    { value: 'BIRTH_CERTIFICATE', label: 'document_type_infobus.birth_certificate' },
  ],
  schema: z.string().min(1, { message: 'required' }),
};

export const documentTypeOctobus: FieldConfig = {
  label: 'document_type',
  type: 'select',
  placeholder: 'document_type_placeholder',
  translateOptions: true,
  options: [
    { value: 'UNKNOWN', label: 'document_type_infobus.unknown' },
    { value: 'PASSPORT', label: 'document_type_infobus.passport' },
    { value: 'MILITARY_ID', label: 'document_type_infobus.military_id' },
    { value: 'FOREIGN_DOCUMENT', label: 'document_type_infobus.foreign_document' },
    { value: 'TRAVEL_PASSPORT', label: 'document_type_infobus.travel_passport' },
    { value: 'SAILORS_PASSPORT', label: 'document_type_infobus.sailors_passport' },
    { value: 'BIRTH_CERTIFICATE', label: 'document_type_infobus.birth_certificate' },
    { value: 'DIPLOMATIC_PASSPORT', label: 'document_type_infobus.diplomatic_passport' },
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
