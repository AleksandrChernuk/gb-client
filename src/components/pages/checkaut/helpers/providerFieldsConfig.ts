/* eslint-disable @typescript-eslint/no-explicit-any */
import { providersList } from '@/constans/providers';

import { IRouteResponse } from '@/types/route.types';
import { z, ZodType } from 'zod';

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
      type: 'group';
      fields: Record<string, FieldConfig>;
      placeholder?: string;
      schema: ZodType;
    }
  | {
      label: string;
      type: 'dob';
      placeholder: string;
      schema?: ZodType;
    };

export type ProviderConfig = {
  required: string[];
  optional: string[];
  fields: Record<string, FieldConfig>;
};

export function getProviderConfigByName(currentTicket: IRouteResponse | null): ProviderConfig {
  switch (currentTicket?.provider_name) {
    case providersList.OCTOBUS:
      return {
        required: ['name', 'surname', 'dob', 'gender', 'document'],
        optional: ['notes'],
        fields: {
          name: {
            label: 'name',
            type: 'text',
            placeholder: 'name_placeholder',
            schema: z.string().min(1, { message: 'required' }),
          },
          surname: {
            label: 'surname',
            type: 'text',
            placeholder: 'surname_placeholder',
            schema: z.string().min(1, { message: 'required' }),
          },
          dob: { label: 'dob', type: 'dob', placeholder: 'ДД/ММ/ГГГГ', schema: z.string().optional() },
          gender: {
            label: 'gender',
            type: 'select',
            options: [
              { value: 'MALE', label: 'MALE' },
              { value: 'FEMALE', label: 'FEMALE' },
            ],
            schema: z.string().optional(),
          },
          discount: {
            label: 'discounts',
            type: 'select',
            options:
              (currentTicket?.details?.discounts || []).map((d: any) => ({
                value: d.id,
                label: d.description || d.name,
              })) || [],
            schema: z.string().optional(),
          },
          document: {
            label: 'document',
            type: 'group',
            fields: {
              type: {
                label: 'document',
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
              number: {
                label: 'document',
                type: 'text',
                placeholder: 'document',
                schema: z.string().optional(),
              },
            },
            schema: z.object({
              type: z.string().optional(),
              number: z.string().optional(),
            }),
          },

          notes: {
            label: 'notes',
            type: 'text',
            schema: z.string().optional(),
          },
        },
      };

    case providersList.INFOBUS:
      return {
        required: ['name', 'surname', 'citizenship', 'document'],
        optional: ['notes'],
        fields: {
          name: {
            label: 'name',
            type: 'text',
            placeholder: 'name_placeholder',
            schema: z.string().min(1, { message: 'required' }),
          },
          surname: {
            label: 'surname',
            type: 'text',
            placeholder: 'surname_placeholder',
            schema: z.string().min(1, { message: 'required' }),
          },
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
          document: { label: 'document', type: 'text', placeholder: 'document', schema: z.string().optional() },
          gender: {
            label: 'gender_label',
            type: 'select',
            options: [
              { value: 'MALE', label: 'MALE' },
              { value: 'FEMALE', label: 'FEMALE' },
            ],
            schema: z.string().optional(),
          },
          discount: {
            label: 'discounts',
            type: 'select',
            options:
              (currentTicket?.details?.discounts || []).map((d: any) => ({
                value: d.id,
                label: d.description || d.name,
              })) || [],
            schema: z.string().optional(),
          },
          notes: {
            label: 'notes',
            type: 'text',
            schema: z.string().optional(),
          },
        },
      };

    case providersList.KLR:
      return {
        required: ['name', 'surname'],
        optional: ['notes'],
        fields: {
          name: {
            label: 'name',
            type: 'text',
            placeholder: 'name_placeholder',
            schema: z.string().min(1, { message: 'required' }),
          },
          surname: {
            label: 'surname',
            type: 'text',
            placeholder: 'surname_placeholder',
            schema: z.string().min(1, { message: 'required' }),
          },
          notes: {
            label: 'notes',
            type: 'text',
            schema: z.string().optional(),
          },
        },
      };

    case providersList.EWE:
      return {
        required: ['name', 'surname'],
        optional: ['notes'],
        fields: {
          name: {
            label: 'name',
            type: 'text',
            placeholder: 'name_placeholder',
            schema: z.string().min(1, { message: 'required' }),
          },
          surname: {
            label: 'surname',
            type: 'text',
            placeholder: 'surname_placeholder',
            schema: z.string().min(1, { message: 'required' }),
          },
          notes: {
            label: 'notes',
            type: 'text',
            schema: z.string().optional(),
          },
        },
      };

    case providersList.TRANS_TEMPO:
      return {
        required: ['name', 'surname'],
        optional: ['notes'],
        fields: {
          name: {
            label: 'name',
            type: 'text',
            placeholder: 'name_placeholder',
            schema: z.string().min(1, { message: 'required' }),
          },
          surname: {
            label: 'surname',
            type: 'text',
            placeholder: 'surname_placeholder',
            schema: z.string().min(1, { message: 'required' }),
          },
          notes: {
            label: 'notes',
            type: 'text',
            schema: z.string().optional(),
          },
        },
      };

    default:
      return {
        required: [],
        optional: [],
        fields: {},
      };
  }
}
