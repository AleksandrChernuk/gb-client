/* eslint-disable @typescript-eslint/no-explicit-any */
import { providersList } from '@/constans/providers';

import { IRouteResponse } from '@/types/route.types';

export type SelectOption = { value: string; label: string };

export const OCTOBUS_DOC_TYPES = ['PASSPORT', 'TRAVEL_PASSPORT', 'BIRTH_CERTIFICATE'];

export const INFOBUS_DOC_TYPES = ['ID_CARD', 'FOREIGN_PASSPORT'];

export const INFOBUS_GENDER = ['MALE', 'FEMALE'];

export type FieldConfig =
  | {
      label: string;
      type: 'text';
      placeholder?: string;
    }
  | {
      label: string;
      type: 'select';
      options: SelectOption[];
      placeholder?: string;
    }
  | {
      label: string;
      type: 'group';
      fields: Record<string, FieldConfig>;
      placeholder?: string;
    }
  | {
      label: string;
      type: 'dob';
      placeholder?: string;
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
        optional: [],
        fields: {
          name: { label: 'name', type: 'text', placeholder: 'name_placeholder' },
          surname: { label: 'surname', type: 'text', placeholder: 'surname_placeholder' },
          dob: { label: 'dob', type: 'dob', placeholder: 'ДД/ММ/ГГГГ' },
          gender: {
            label: 'gender',
            type: 'select',
            options: [
              { value: 'MALE', label: 'MALE' },
              { value: 'FEMALE', label: 'FEMALE' },
            ],
          },
          discount: {
            label: 'Скидка',
            type: 'select',
            options:
              (currentTicket?.details?.discounts || []).map((d: any) => ({
                value: d.id,
                label: d.description || d.name,
              })) || [],
          },
          document: {
            label: 'Документ',
            type: 'group',
            fields: {
              type: {
                label: 'Тип документа',
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
              },
              number: {
                label: 'Номер документа',
                type: 'text',
                placeholder: 'Введите номер документа',
              },
            },
          },
        },
      };

    case providersList.INFOBUS:
      return {
        required: ['name', 'surname', 'citizenship', 'document'],
        optional: [],
        fields: {
          name: { label: 'Имя', type: 'text', placeholder: 'Ваше имя' },
          surname: { label: 'Фамилия', type: 'text', placeholder: 'Ваша фамилия' },
          citizenship: {
            label: 'Гражданство',
            type: 'select',
            options: [
              { value: 'UA', label: 'UA' },
              { value: 'PL', label: 'PL' },
              { value: 'DE', label: 'DE' },
            ],
          },
          document: { label: 'Документ', type: 'text', placeholder: 'Номер документа' },
          gender: {
            label: 'Пол',
            type: 'select',
            options: [
              { value: 'MALE', label: 'MALE' },
              { value: 'FEMALE', label: 'FEMALE' },
            ],
          },
          discount: {
            label: 'Скидка',
            type: 'select',
            options:
              (currentTicket?.details?.discounts || []).map((d: any) => ({
                value: d.id,
                label: d.description || d.name,
              })) || [],
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
