import { z, ZodTypeAny } from 'zod';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { parse, isValid, subYears, subDays, isAfter, endOfDay } from 'date-fns';
import { FieldConfig, ProviderConfig } from '@/shared/types/checkot.types';

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
    { message: 'invalid_date' },
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
      { message: 'invalid_date' },
    );

function getFieldSchema(field: FieldConfig): ZodTypeAny {
  if (!field.schema) {
    throw new Error(`Schema not defined for field "${field.label}"`);
  }
  return field.schema;
}

function isFlagEnabled(flag?: boolean | string): boolean {
  return flag === true || flag === 'true' || flag === '1';
}

function addRequiredIssue(ctx: z.RefinementCtx, path: string) {
  ctx.addIssue({
    path: [path],
    code: z.ZodIssueCode.custom,
    message: 'required',
  });
}

export function getPassengerSchemaByConfig(config: ProviderConfig) {
  const shape: Record<string, ZodTypeAny> = {};

  for (const fieldName of config.required) {
    if (config.fields[fieldName]) {
      shape[fieldName] = getFieldSchema(config.fields[fieldName]);
    }
  }

  if (!shape.documentType) {
    shape.documentType = z.string().optional();
  }

  shape.discountPercent = z.string().optional().default('');
  shape.discountDescription = z.string().optional().default('');
  shape.discountId = z.string().optional();

  shape.paidBaggage = z
    .array(
      z.object({
        baggageId: z.string(),
        baggageTitle: z.string(),
        length: z.string(),
        width: z.string(),
        height: z.string(),
        kg: z.string(),
        typ: z.string().optional(),
        price: z.number(),
        currency: z.string(),
      }),
    )
    .optional()
    .nullable();

  const baseSchema = z.object(shape);

  return baseSchema.superRefine((data, ctx) => {
    if (isFlagEnabled(config.needBirth) && !data.bday) {
      addRequiredIssue(ctx, 'bday');
    }

    const requireBdayForDiscount =
      config.requireBdayForDiscount === undefined ? true : isFlagEnabled(config.requireBdayForDiscount);

    if (requireBdayForDiscount && data.discountId && !data.bday) {
      ctx.addIssue({
        path: ['bday'],
        code: z.ZodIssueCode.custom,
        message: 'required',
      });
    }
    if ((isFlagEnabled(config.needDoc) || !!config?.automaticDiscount) && !data.documentType) {
      addRequiredIssue(ctx, 'documentType');
    }

    if (isFlagEnabled(config.needDoc) && !data.documentNumber) {
      addRequiredIssue(ctx, 'documentNumber');
    }

    if (isFlagEnabled(config.needDoc) && !data.documentNumber) {
      addRequiredIssue(ctx, 'documentNumber');
    }

    if (isFlagEnabled(config.needDocExpireDate) && !data.expiryDate) {
      addRequiredIssue(ctx, 'expiryDate');
    }

    if (isFlagEnabled(config.needCitizenship) && !data.citizenship) {
      addRequiredIssue(ctx, 'citizenship');
    }

    if (isFlagEnabled(config.needGender) && !data.gender) {
      addRequiredIssue(ctx, 'gender');
    }

    if (isFlagEnabled(config.needMiddlename) && !data.middlename) {
      addRequiredIssue(ctx, 'middlename');
    }
  });
}

const seatSchema = z.object({
  seatId: z.string().nullable(),
  type: z.string().nullable(),
  seatNumber: z.string().nullable(),
  seatCoords: z.string().nullable(),
  status: z.string().nullable(),
  isSelected: z.boolean().nullable(),
});

function getCheckoutSchemaForProvider(providerConfig: ProviderConfig, hasFreeSeats: boolean) {
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
            return phoneNumber?.isValid() ?? false;
          },
          { message: 'invalid_number' },
        ),
      payment: z.enum(['BOOK', 'PAYMENT_AT_BOARDING']),
      accept_rules: z.boolean().refine((v) => v === true, { message: 'required' }),
      selectedSeats: z.array(seatSchema).optional(),
    })
    .superRefine((data, ctx) => {
      if (!hasFreeSeats) return;

      const hasEnoughSeats = Array.isArray(data.selectedSeats) && data.selectedSeats.length >= data.passengers.length;

      if (!hasEnoughSeats) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['selectedSeats'],
          message: 'seats_for_all_passengers',
        });
      }
    });
}

export default getCheckoutSchemaForProvider;
