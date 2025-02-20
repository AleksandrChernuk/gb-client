"use client";
import { toDate } from "date-fns";
import { z } from "zod";
import { differenceInYears } from "date-fns";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const useCheckoutSchema = (pass_count: number, t: (key: string) => string) =>
  z.object({
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
              const date = toDate(val)
              const today = new Date()
              const yearsDiff = differenceInYears(today, date)
              return yearsDiff >= 0 && yearsDiff <= 90
            },
            { message: 'invalid_date' }
          ),
      })
    ),
    email: z.string().min(1, t('required')).email(t('invalid_email')),
    phone: z
      .string()
      .min(8, t('required'))
      .refine(
        (value) => {
          const phoneNumber = parsePhoneNumberFromString(value)
          return phoneNumber ? phoneNumber.isValid() : false
        },
        { message: t('invalid_number') }
      ),
    accept_rules: z.boolean().refine((val) => val === true, {
      message: 'You must accept the rules',
    }),

    selected_seats: z.array(z.object({})).refine((seats) => seats.length === pass_count, {
      message: 'Не вірна кількість вибраних місць',
    }),
    processing_data: z.boolean().refine((val) => val === true, {
      message: 'You must agree to data processing',
    }),
  })
