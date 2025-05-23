import { z, ZodTypeAny } from 'zod';
import { FieldConfig, ProviderConfig } from './providerFieldsConfig';
import parsePhoneNumberFromString from 'libphonenumber-js';

function getFieldSchema(field: FieldConfig): ZodTypeAny {
  if (field.type === 'group') {
    const shape: Record<string, ZodTypeAny> = {};
    for (const [key, subField] of Object.entries(field.fields)) {
      shape[key] = getFieldSchema(subField);
    }
    return field.schema ?? z.object(shape);
  }
  if (!field.schema) {
    console.error('NO SCHEMA FOR FIELD:', field);
    throw new Error('Field schema is undefined');
  }
  return field.schema;
}

export function getPassengerSchemaByConfig(config: ProviderConfig) {
  const shape: Record<string, ZodTypeAny> = {};
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
