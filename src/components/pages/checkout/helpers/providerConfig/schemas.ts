import { z, ZodTypeAny } from 'zod';

import parsePhoneNumberFromString from 'libphonenumber-js';
import { FieldConfig, ProviderConfig } from './types';
import { parse, isValid, isBefore, subWeeks } from 'date-fns';

export const bdaySchema = z.string().refine(
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

function getFieldSchema(field: FieldConfig): ZodTypeAny {
  if (!field.schema) throw new Error(`Schema not defined for field "${field.label}"`);
  return field.schema;
}

export function getPassengerSchemaByConfig(config: ProviderConfig) {
  const shape: Record<string, ZodTypeAny> = {};

  for (const fieldName of config.required) {
    if (!config.fields[fieldName]) continue;
    shape[fieldName] = getFieldSchema(config.fields[fieldName]);
  }

  const baseSchema = z.object(shape);

  return baseSchema.superRefine((data, ctx) => {
    if ('discount' in data) {
      if (data.discount && !data.bday) {
        ctx.addIssue({
          path: ['bday'],
          code: z.ZodIssueCode.custom,
          message: 'required',
        });
      }
    }
  });
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
      selected_seats: z.array(seatSchema).optional(),
    })
    .superRefine((data, ctx) => {
      if (!hasFreeSeats) return;
      if (!Array.isArray(data.selected_seats) || data.selected_seats.length < data.passengers.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['selected_seats'],
          message: 'seats_for_all_passengers',
        });
      }
    });
}
