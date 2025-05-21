/* eslint-disable @typescript-eslint/no-explicit-any */
import { z, ZodRawShape } from 'zod';
import { FieldConfig, ProviderConfig } from './providerFieldsConfig';
import parsePhoneNumberFromString from 'libphonenumber-js';

function getFieldSchema(field: FieldConfig) {
  switch (field.type) {
    case 'text':
      return z.string().min(1, { message: 'required' });
    case 'select':
      return z.string().min(1, { message: 'required' });
    case 'dob':
      return z.string().min(10, { message: 'required' });
    case 'group':
      const groupShape: any = {};
      for (const [subField, subConfig] of Object.entries(field.fields)) {
        groupShape[subField] = getFieldSchema(subConfig);
      }
      return z.object(groupShape);
    default:
      return z.any();
  }
}

export function getPassengerSchemaByConfig(config: ProviderConfig) {
  const shape: ZodRawShape = {};
  for (const fieldName of config.required) {
    shape[fieldName] = getFieldSchema(config.fields[fieldName]);
  }
  for (const fieldName of config.optional || []) {
    shape[fieldName] = getFieldSchema(config.fields[fieldName]).optional();
  }
  return z.object(shape);
}

export function getCheckoutSchemaForProvider(providerConfig: ProviderConfig, hasFreeSeats: boolean) {
  const seatSchema = z.object({
    id: z.string().nullable(),
    type: z.string().nullable(),
    number: z.string().nullable(),
    coords: z.string().nullable(),
    status: z.string().nullable(),
    isSelected: z.boolean().nullable(),
  });

  return z
    .object({
      passengers: z.array(getPassengerSchemaByConfig(providerConfig)),
      email: z.string().min(1, { message: 'required' }).email('invalid_email'),
      phone: z
        .string()
        .min(8, { message: 'required' })
        .refine(
          (value) => {
            const phoneNumber = parsePhoneNumberFromString(value);
            return phoneNumber ? phoneNumber.isValid() : false;
          },
          { message: 'invalid_number' },
        ),
      payment: z.enum(['card', 'on_boarding', 'booking']).nullable(),
      accept_rules: z.boolean().refine((v) => v === true, { message: 'required' }),
      selected_seats: z.array(seatSchema),
    })
    .superRefine((data, ctx) => {
      if (hasFreeSeats && (!data.selected_seats || data.selected_seats.length < 1)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['selected_seats'],
          message: 'seats_for_all_passengers',
        });
      }
    });
}
