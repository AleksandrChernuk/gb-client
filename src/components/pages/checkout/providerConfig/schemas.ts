import { z, ZodTypeAny } from 'zod';

import parsePhoneNumberFromString from 'libphonenumber-js';
import { FieldConfig, ProviderConfig } from './types';
import { parse, isValid, isBefore, subYears, subDays, isAfter, endOfDay } from 'date-fns';

export const bdaySchema = z
  .string()
  .optional()
  .refine(
    (value) => {
      if (!value) return true;
      const date = parse(value, 'yyyy-MM-dd', new Date());
      if (!isValid(date)) return false;
      const now = new Date();
      const minDate = subYears(now, 100);
      const maxDate = endOfDay(now);

      return isAfter(date, minDate) && !isAfter(date, maxDate);

      return isBefore(minDate, date) === false && isBefore(date, maxDate);
    },
    {
      message: 'invalid_date',
    },
  );

export const passportExpirySchema = (departureDate: Date) =>
  z
    .string()
    .min(1, { message: 'required' })
    .refine(
      (value) => {
        const date = parse(value, 'yyyy-MM-dd', new Date());

        if (!isValid(date)) return false;

        const limitDate = subDays(departureDate, 7);
        return isAfter(date, limitDate);
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
      payment: z.enum(['BOOK', 'PAYMENT_AT_BOARDING']),
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
