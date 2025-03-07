'use client';
import { toDate } from 'date-fns';
import { z } from 'zod';
import { differenceInYears } from 'date-fns';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useCurrentTicketStore } from '@/store/useCurrentTicket';

export const useCheckoutSchema = (pass_count: number, t: (key: string) => string) => {
  const selectedTicket = useCurrentTicketStore((state) => state.selectedTicket);
  console.log(selectedTicket?.details?.seats_map);
  return z.object({
    passengers: z.array(
      z.object({
        id: z.string(),
        isChildren: z.boolean(),
        name: z.string().min(1, t('required')),
        surname: z.string().min(1, t('required')),
        notes: z.string().optional(),
        dob: z
          .string()
          .min(1, 'required')
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
    email: z.string().min(1, t('required')).email(t('invalid_email')),
    phone: z
      .string()
      .min(8, t('required'))
      .refine(
        (value) => {
          const phoneNumber = parsePhoneNumberFromString(value);
          return phoneNumber ? phoneNumber.isValid() : false;
        },
        { message: t('invalid_number') },
      ),
    accept_rules: z.boolean().refine((val) => val === true, {
      message: t('accept_rules'),
    }),

    processing_data: z.boolean().refine((val) => val === true, {
      message: t('processing_data'),
    }),

    selected_seats:
      selectedTicket &&
      selectedTicket?.details &&
      Array.isArray(selectedTicket?.details?.seats_map) &&
      selectedTicket?.details?.seats_map.length >= 1
        ? z.array(z.object({})).refine((seats) => seats.length === pass_count, {
            message: 'Не вірна кількість вибраних місць',
          })
        : z.array(z.string()).optional(),
  });
};
