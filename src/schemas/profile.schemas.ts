import { passwordShema } from '@/schemas/schemas.constans';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { z } from 'zod';

export const personalDataSchema = z.object({
  first_name: z.string().min(1, 'required'),
  last_name: z.string().min(1, 'required'),
  middlename: z.string().optional(),
});

export const passwordProfieUpdateSchema = z
  .object({
    password: passwordShema,
    new_password: passwordShema,
    confirm_new_password: passwordShema,
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: 'passwordsDoNotMatch',
    path: ['confirm_new_password'],
  });

export const profilePhoneForm = z.object({
  phone: z
    .string()
    .min(8, 'required')
    .refine(
      (value) => {
        const phoneNumber = parsePhoneNumberFromString(value);
        return phoneNumber ? phoneNumber.isValid() : false;
      },
      { message: 'invalid_number' },
    ),
});
