import * as z from 'zod';
import { isCleanInput } from './schemas.constans';

export const passwordShema = z
  .string()
  .trim()
  .min(8, { message: 'minLength' })
  .max(20, { message: 'maxLength' })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'uppercase',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'lowercase',
  })
  .refine((password) => /[0-9]/.test(password), { message: 'number' })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: 'special',
  })
  .refine(isCleanInput, { message: 'suspicious_input' });

export const emailShema = z
  .string()
  .trim()
  .min(1, { message: 'required' })
  .email('emailNotValid')
  .refine(isCleanInput, { message: 'suspicious_input' });

export const nameShema = z
  .string()
  .trim()
  .min(1, { message: 'required' })
  .refine(isCleanInput, { message: 'suspicious_input' });
