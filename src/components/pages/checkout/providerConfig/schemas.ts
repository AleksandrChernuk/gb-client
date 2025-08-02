import { z, ZodTypeAny } from 'zod';

import parsePhoneNumberFromString from 'libphonenumber-js';
import { FieldConfig, ProviderConfig } from './types';
import { parse, isValid, subYears, subDays, isAfter, endOfDay } from 'date-fns';

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

  shape.discountPercent = z.string().optional();
  shape.discountDescription = z.string().optional();
  shape.discountId = z.string().optional();

  const baseSchema = z.object(shape);

  return baseSchema.superRefine((data, ctx) => {
    const flagIsOn = (flag?: boolean | string) => flag === true || flag === 'true' || flag === '1';

    if (flagIsOn(config.needBirth) && !data.bday) {
      ctx.addIssue({
        path: ['bday'],
        code: z.ZodIssueCode.custom,
        message: 'required',
      });
    }

    if (flagIsOn(config.needDoc) && !data.documentNumber) {
      ctx.addIssue({
        path: ['documentNumber'],
        code: z.ZodIssueCode.custom,
        message: 'required',
      });
    }

    if (flagIsOn(config.needDocExpireDate) && !data.expiryDate) {
      ctx.addIssue({
        path: ['expiryDate'],
        code: z.ZodIssueCode.custom,
        message: 'required',
      });
    }

    if (flagIsOn(config.needCitizenship) && !data.citizenship) {
      ctx.addIssue({
        path: ['citizenship'],
        code: z.ZodIssueCode.custom,
        message: 'required',
      });
    }

    if (flagIsOn(config.needGender) && !data.gender) {
      ctx.addIssue({
        path: ['gender'],
        code: z.ZodIssueCode.custom,
        message: 'required',
      });
    }

    if (flagIsOn(config.needMiddlename) && !data.middlename) {
      ctx.addIssue({
        path: ['middlename'],
        code: z.ZodIssueCode.custom,
        message: 'required',
      });
    }
  });
}

export function getCheckoutSchemaForProvider(providerConfig: ProviderConfig, hasFreeSeats: boolean) {
  const seatSchema = z.object({
    seatId: z.string().nullable(),
    type: z.string().nullable(),
    seatNumber: z.string().nullable(),
    seatCoords: z.string().nullable(),
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
      selectedSeats: z.array(seatSchema).optional(),
    })
    .superRefine((data, ctx) => {
      if (!hasFreeSeats) return;
      if (!Array.isArray(data.selectedSeats) || data.selectedSeats.length < data.passengers.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['selectedSeats'],
          message: 'seats_for_all_passengers',
        });
      }
    });
}
