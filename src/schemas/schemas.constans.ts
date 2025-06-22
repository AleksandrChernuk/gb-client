import * as z from 'zod';

export const passwordShema = z
  .string()
  .trim()
  .min(8, { message: 'password_validate.minLength' })
  .max(20, { message: 'password_validate.maxLength' })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'password_validate.uppercase',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'password_validate.lowercase',
  })
  .refine((password) => /[0-9]/.test(password), { message: 'number' })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: 'password_validate.special',
  });

export const emailShema = z.string().trim().min(1, { message: 'required' }).email('password_validate.emailNotValid');

export const nameShema = z
  .string()
  .trim()
  .min(1, { message: 'required' })
  .regex(/^[a-zA-Zа-яА-ЯіїєґІЇЄҐ'’ -]+$/, { message: 'noSpecialCharacters' });
