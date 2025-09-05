import { isCleanInput, passwordShema } from '@/schemas/schemas.constans';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { z } from 'zod';
import { emailShema } from './constans.schemas';

export const profileNameSchema = z.object({
  name: z.string().min(1, 'required'),
});
export const profileEmailSchema = z.object({
  email: emailShema,
  password: passwordShema,
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
    )
    .refine(isCleanInput, { message: 'suspicious_input' }),
});
