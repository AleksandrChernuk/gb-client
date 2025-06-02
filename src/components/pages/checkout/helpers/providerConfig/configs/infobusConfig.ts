import { z } from 'zod';
import { ProviderConfig } from '../types';
import { IRouteResponse } from '@/types/route.types';
import { bdaySchema } from '../schemas';

const infobusConfig = (currentTicket: IRouteResponse | null): ProviderConfig => {
  const hasDiscounts = !!currentTicket?.details?.discounts?.length;

  return {
    required: [
      'first_name',
      'last_name',
      'document_type',
      'document_number',
      'citizenship',
      ...(currentTicket?.details?.need_middlename ? ['middlename'] : []),
      ...(hasDiscounts ? ['discount', 'bday'] : []),
      ...(currentTicket?.details?.need_citizenship ? ['citizenship'] : []),
      ...(currentTicket?.details?.need_doc_expire_date ? ['expiryDate'] : []),
      ...(currentTicket?.details?.need_gender ? ['gender'] : []),
    ],
    fields: {
      first_name: {
        label: 'first_name',
        type: 'text',
        placeholder: 'first_name_placeholder',
        schema: z.string().min(1, { message: 'required' }),
      },
      last_name: {
        label: 'last_name',
        type: 'text',
        placeholder: 'last_name_placeholder',
        schema: z.string().min(1, { message: 'required' }),
      },
      document_type: {
        label: 'document_type',
        type: 'select',
        placeholder: 'document_type_placeholder',
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
      },
      document_number: {
        label: 'document_number',
        type: 'text',
        placeholder: 'document_number_placeholder',
        schema: z.string().min(1, { message: 'required' }),
      },
      citizenship: {
        label: 'citizenship_label',
        type: 'citizenship',
        placeholder: 'citizenship_placeholder',
        schema: z.string().min(1, { message: 'required' }),
      },
      ...(currentTicket?.details?.need_middlename
        ? {
            middlename: {
              label: 'middlename',
              type: 'text',
              placeholder: 'middlename_placeholder',
              schema: z.string().min(1, { message: 'required' }),
            },
          }
        : {}),
      ...(currentTicket?.details?.need_citizenship
        ? {
            citizenship: {
              label: 'citizenship_label',
              type: 'citizenship',
              placeholder: 'citizenship_placeholder',
              schema: z.string().min(1, { message: 'required' }),
            },
          }
        : {}),

      ...(currentTicket?.details?.need_doc_expire_date
        ? {
            expiryDate: {
              label: 'expiry_date',
              type: 'text',
              placeholder: 'expiry_date_placeholder',
              schema: z.string().min(1, { message: 'required' }),
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
              schema: z.string().min(1, { message: 'required' }),
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
              placeholder: 'discounts_placeholder',
              options: currentTicket?.details?.discounts.map((d) => ({
                value: String(d.id ?? ''),
                label: d.description || d.name || '',
              })),
              schema: z.string().optional(),
            },
          }
        : {}),
    },
  };
};

export default infobusConfig;
