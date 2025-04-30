import * as z from 'zod';

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
  });

export const emailShema = z.string().trim().min(1, { message: 'required' }).email('emailNotValid');

export const nameShema = z
  .string()
  .trim()
  .min(1, { message: 'required' })
  .regex(/^[a-zA-Zа-яА-ЯіїєґІЇЄҐ'’ -]+$/, { message: 'noSpecialCharacters' });
