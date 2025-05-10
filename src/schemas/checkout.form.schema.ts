import { toDate } from 'date-fns';
import { z } from 'zod';
import { differenceInYears } from 'date-fns';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const CheckoutSchema = z
  .object({
    passengers: z.array(
      z.object({
        id: z.string(),
        isChildren: z.boolean(),
        name: z.string().min(1, { message: 'required' }),
        surname: z.string().min(1, { message: 'required' }),
        notes: z.string().optional(),
        discount: z.string().optional(),
        citizenship: z.string().optional(),
        gender: z.string().optional(),
        document: z
          .object({
            type: z.string().optional(),
            number: z.string().min(1, { message: 'required' }),
          })
          .refine(
            ({ number }) => {
              if (!number.trim()) return true;
            },
            {
              path: ['type'],
            },
          ),
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
      message: 'required',
    }),
    selected_seats: z
      .array(
        z.object({
          id: z.string().nullable(),
          type: z.enum(['SEAT', 'NOT SEAT']).nullable(),
          number: z.string().nullable(),
          coords: z.string().nullable(),
          status: z.enum(['FREE', 'BUSY']).nullable(),
          isSelected: z.boolean().nullable(),
        }),
      )
      .min(1, { message: 'seats_for_all_passengers' }),
  })
  .refine((data) => data.passengers.length === data.selected_seats.length, {
    path: ['selected_seats'],
    message: 'seats_for_all_passengers',
  });
