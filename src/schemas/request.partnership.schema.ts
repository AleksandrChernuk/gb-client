import * as z from 'zod';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const useRequestPartnershipSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(1),
    company: z.string().min(1),
    type: z.string().min(1),
    email: z.object({
      adults: z.number().min(1, 'Должен быть хотя бы 1 взрослый').max(10, 'Не более 10 взрослых'),
      children: z.number().min(0, 'Детей может быть 0').max(5, 'Не более 5 детей'),
    }),
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
  });
