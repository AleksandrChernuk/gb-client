// import { toDate } from 'date-fns';
import { z } from 'zod';
// import { differenceInYears } from 'date-fns';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const CheckoutSchema = z.object({
  passengers: z.array(
    z.object({
      id: z.string(),
      isChildren: z.boolean(),
      name: z.string().min(1, { message: 'required' }),
      surname: z.string().min(1, { message: 'required' }),
      notes: z.string().optional(),
    }),
  ),
  email: z.string().min(1, { message: 'required' }).email('invalid_email'),
  payment: z.enum(['booking', 'card', 'on_boarding']).nullable(),
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
});
