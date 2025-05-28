/* eslint-disable @typescript-eslint/no-explicit-any */
import { providersList } from '@/constans/providers';

import { IRouteResponse } from '@/types/route.types';
import { z, ZodType } from 'zod';
import { parse, isValid, isBefore, subWeeks } from 'date-fns';

export type SelectOption = { value: string; label: string };
export const OCTOBUS_DOC_TYPES = ['PASSPORT', 'TRAVEL_PASSPORT', 'BIRTH_CERTIFICATE'];
export const INFOBUS_DOC_TYPES = ['ID_CARD', 'FOREIGN_PASSPORT'];
export const INFOBUS_GENDER = ['MALE', 'FEMALE'];

export type FieldConfig =
  | {
      label: string;
      type: 'text';
      placeholder?: string;
      schema: ZodType;
    }
  | {
      label: string;
      type: 'select';
      options: SelectOption[];
      placeholder?: string;
      schema: ZodType;
    }
  | {
      label: string;
      type: 'bday';
      placeholder: string;
      schema?: ZodType;
    };

export type ProviderConfig = {
  required: string[];
  fields: Record<string, FieldConfig>;
};

export function getProviderConfigByName(currentTicket: IRouteResponse | null): ProviderConfig {
  const hasDiscounts = !!currentTicket?.details?.discounts?.length;

  switch (currentTicket?.provider_name) {
    case providersList.OCTOBUS:
      return {
        required: ['first_name', 'last_name', ...(hasDiscounts ? ['discount', 'bday'] : [])],
        fields: {
          first_name: {
            label: 'name',
            type: 'text',
            placeholder: 'name_placeholder',
            schema: z.string().min(1, { message: 'required' }),
          },
          last_name: {
            label: 'surname',
            type: 'text',
            placeholder: 'surname_placeholder',
            schema: z.string().min(1, { message: 'required' }),
          },
          ...(hasDiscounts
            ? {
                discount: {
                  label: 'discounts',
                  type: 'select',
                  options: (currentTicket?.details?.discounts || []).map((d) => ({
                    value: String(d.id ?? ''),
                    label: `${d.percent} ${d.description || d.name}`,
                  })),
                  schema: z.string().optional(),
                },
                bday: {
                  label: 'bday',
                  type: 'bday',
                  placeholder: 'bday_placeholder',
                  schema: bdaySchema.optional(),
                },
              }
            : {}),
        },
      };

    case providersList.INFOBUS:
      return {
        required: [
          'first_name',
          'last_name',
          ...(hasDiscounts ? ['discount', 'bday'] : []),
          ...(currentTicket?.details?.need_citizenship ? ['citizenship'] : []),
          'document_type',
          'document_number',
          ...(currentTicket?.details?.need_doc_expire_date ? ['expiryDate'] : []),

          ...(currentTicket?.details?.need_gender ? ['gender'] : []),
          ...(currentTicket?.details?.need_middlename ? ['middlename'] : []),
        ],
        fields: {
          first_name: {
            label: 'name',
            type: 'text',
            placeholder: 'name_placeholder',
            schema: z.string().min(1, { message: 'required' }),
          },
          last_name: {
            label: 'surname',
            type: 'text',
            placeholder: 'surname_placeholder',
            schema: z.string().min(1, { message: 'required' }),
          },
          ...(currentTicket?.details?.need_middlename
            ? {
                middlename: {
                  label: 'middlename',
                  type: 'text',
                  placeholder: 'middlename_placeholder',
                  schema: z.string().optional(),
                },
              }
            : {}),
          ...(currentTicket?.details?.need_citizenship
            ? {
                citizenship: {
                  label: 'citizenship_label',
                  type: 'select',
                  options: [
                    { value: 'UA', label: 'UA' },
                    { value: 'PL', label: 'PL' },
                    { value: 'DE', label: 'DE' },
                  ],
                  schema: z.string().optional(),
                },
              }
            : {}),
          documentType: {
            label: 'document_type',
            type: 'select',
            options: [
              { value: 'UNKNOWN', label: 'unknown' },
              { value: 'PASSPORT', label: 'passport' },
              { value: 'MILITARY_ID', label: 'military_id' },
              { value: 'FOREIGN_DOCUMENT', label: 'foreign_document' },
              { value: 'TRAVEL_PASSPORT', label: 'Загранпаспорт' },
              { value: 'SAILORS_PASSPORT', label: 'sailors_passport' },
              { value: 'BIRTH_CERTIFICATE', label: 'birth_certificate' },
              { value: 'DIPLOMATIC_PASSPORT', label: 'diplomatic_passport' },
            ],
            schema: z.string().optional(),
          },
          documentNumber: {
            label: 'document_number',
            type: 'text',
            placeholder: 'document',
            schema: z.string().optional(),
          },
          ...(currentTicket?.details?.need_doc_expire_date
            ? {
                expiryDate: {
                  label: 'expiry_date',
                  type: 'text',
                  placeholder: 'expiry_date_placeholder',
                  schema: z.string().optional(),
                },
              }
            : {}),

          ...(currentTicket?.details?.need_gender
            ? {
                gender: {
                  label: 'gender_label',
                  type: 'select',
                  options: [
                    { value: 'MALE', label: 'MALE' },
                    { value: 'FEMALE', label: 'FEMALE' },
                  ],
                  schema: z.string().optional(),
                },
              }
            : {}),
          ...(currentTicket?.details?.discounts?.length
            ? {
                bday: {
                  label: 'bday',
                  type: 'bday',
                  placeholder: 'bday_placeholder',
                  schema: bdaySchema.optional(),
                },
                discount: {
                  label: 'discounts',
                  type: 'select',
                  options: currentTicket?.details?.discounts.map((d: any) => ({
                    value: String(d.id ?? ''),
                    label: d.description || d.name,
                  })),
                  schema: z.string().optional(),
                },
              }
            : {}),
        },
      };

    default:
      return {
        required: ['first_name', 'last_name', ...(hasDiscounts ? ['discount', 'bday'] : [])],
        fields: {
          first_name: {
            label: 'name',
            type: 'text',
            placeholder: 'name_placeholder',
            schema: z.string().min(1, { message: 'required' }),
          },
          last_name: {
            label: 'surname',
            type: 'text',
            placeholder: 'surname_placeholder',
            schema: z.string().min(1, { message: 'required' }),
          },
          ...(hasDiscounts
            ? {
                discount: {
                  label: 'discounts',
                  type: 'select',
                  options: (currentTicket?.details?.discounts || []).map((d: any) => ({
                    value: String(d.id ?? ''),
                    label: d.description || d.name,
                  })),
                  schema: z.string().optional(),
                },
                bday: {
                  label: 'bday',
                  type: 'bday',
                  placeholder: 'bday_placeholder',
                  schema: bdaySchema.optional(),
                },
              }
            : {}),
        },
      };
  }
}

const bdaySchema = z.string().refine(
  (value) => {
    if (!value) return true;
    const [day, month, year] = value.split('/');
    if (!day || !month || !year) return false;
    const date = parse(`${day}.${month}.${year}`, 'dd.MM.yyyy', new Date());
    if (!isValid(date)) return false;

    const now = new Date();
    const minDate = subWeeks(now, 52 * 80);
    const maxDate = subWeeks(now, 1);
    return isBefore(minDate, date) && isBefore(date, maxDate);
  },
  {
    message: 'invalid_date',
  },
);
