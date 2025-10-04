import { z, ZodTypeAny } from 'zod';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { parse, isValid, subYears, subDays, isAfter, endOfDay } from 'date-fns';
import { FieldConfig, ProviderConfig } from '@/shared/types/checkot.types';

// Схема для даты рождения
export const bdaySchema = z
  .string()
  .optional()
  .refine(
    (value) => {
      if (!value) return true;

      const date = parse(value, 'yyyy-MM-dd', new Date());
      if (!isValid(date)) return false;

      const now = new Date();
      const minDate = subYears(now, 100); // не старше 100 лет
      const maxDate = endOfDay(now); // не в будущем

      return isAfter(date, minDate) && !isAfter(date, maxDate);
    },
    { message: 'invalid_date' },
  );

// Схема для даты истечения паспорта
export const passportExpirySchema = (departureDate: Date) =>
  z
    .string()
    .min(1, { message: 'required' })
    .refine(
      (value) => {
        const date = parse(value, 'yyyy-MM-dd', new Date());
        if (!isValid(date)) return false;

        // Паспорт должен быть действителен минимум 7 дней после отправления
        const limitDate = subDays(departureDate, 7);
        return isAfter(date, limitDate);
      },
      { message: 'invalid_date' },
    );

// Получение схемы поля
function getFieldSchema(field: FieldConfig): ZodTypeAny {
  if (!field.schema) {
    throw new Error(`Schema not defined for field "${field.label}"`);
  }
  return field.schema;
}

// Проверка флага (поддерживает boolean и строки)
function isFlagEnabled(flag?: boolean | string): boolean {
  return flag === true || flag === 'true' || flag === '1';
}

// Добавление ошибки для обязательного поля
function addRequiredIssue(ctx: z.RefinementCtx, path: string) {
  ctx.addIssue({
    path: [path],
    code: z.ZodIssueCode.custom,
    message: 'required',
  });
}

// Генерация схемы пассажира на основе конфига
export function getPassengerSchemaByConfig(config: ProviderConfig) {
  const shape: Record<string, ZodTypeAny> = {};

  // Добавляем обязательные поля из конфига
  for (const fieldName of config.required) {
    if (config.fields[fieldName]) {
      shape[fieldName] = getFieldSchema(config.fields[fieldName]);
    }
  }

  // Добавляем поля скидок (всегда опциональны)
  shape.discountPercent = z.string().optional();
  shape.discountDescription = z.string().optional();
  shape.discountId = z.string().optional();

  const baseSchema = z.object(shape);

  // Дополнительная валидация условных полей
  return baseSchema.superRefine((data, ctx) => {
    if (isFlagEnabled(config.needBirth) && !data.bday) {
      addRequiredIssue(ctx, 'bday');
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

// Схема места
const seatSchema = z.object({
  seatId: z.string().nullable(),
  type: z.string().nullable(),
  seatNumber: z.string().nullable(),
  seatCoords: z.string().nullable(),
  status: z.string().nullable(),
  isSelected: z.boolean().nullable(),
});

// Главная схема checkout формы
export function getCheckoutSchemaForProvider(providerConfig: ProviderConfig, hasFreeSeats: boolean) {
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
      // Проверяем выбор мест только если они доступны
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
