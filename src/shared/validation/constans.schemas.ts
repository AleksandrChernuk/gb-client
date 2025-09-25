import * as z from 'zod';
import { isCleanInput } from './schemas.constans';

export const passwordShema = z
  .string()
  .trim()
  .min(8, { message: 'password_validate.minLength' })
  .max(20, { message: 'password_validate.maxLength' })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'password_validate.uppercase',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'password_validate.vlowercase',
  })
  .refine((password) => /[0-9]/.test(password), { message: 'password_validate.number' })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: 'password_validate.special',
  })
  .refine(isCleanInput, { message: 'password_validate.suspicious_input' });

export const emailShema = z
  .string()
  .trim()
  .min(1, { message: 'email_validate.required' })
  .email('emailNotValid')
  .refine(isCleanInput, { message: 'email_validate.suspicious_input' });

export const nameShema = z
  .string()
  .trim()
  .min(1, { message: 'required' })
  .refine(isCleanInput, { message: 'suspicious_input' });
