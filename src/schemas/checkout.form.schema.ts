import { toDate } from 'date-fns';
import { z } from 'zod';
import { differenceInYears } from 'date-fns';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const CheckoutSchema = z.object({
  passengers: z.array(
    z.object({
      id: z.string(),
      isChildren: z.boolean(),
      name: z.string().min(1, { message: 'required' }),
      surname: z.string().min(1, { message: 'required' }),
      notes: z.string().optional(),
      discount: z.string().optional(),
      document: z.object({
        type: z.string().optional(),
        number: z.string().min(1, { message: 'required' }),
      }),
      dob: z
        .string()
        .min(1, { message: 'required' })
        .refine(
          (val) => {
            const date = toDate(val);
            const today = new Date();
            const yearsDiff = differenceInYears(today, date);
            return yearsDiff >= 0 && yearsDiff <= 90;
          },
          { message: 'invalid_date' },
        ),
    }),
  ),
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
  accept_rules: z.boolean().refine((val) => val === true, {
    message: 'accept_rules',
  }),

  processing_data: z.boolean().refine((val) => val === true, {
    message: 'processing_data',
  }),
});
