import * as z from 'zod';

export const forbiddenPatterns = [
  /<script.*?>.*?<\/script>/gi,
  /(<|%3C)script/gi,
  /('|--|;|\/\*|\*\/|xp_)/gi,
  /\b(SELECT|INSERT|DELETE|UPDATE|DROP|UNION|EXEC|INFORMATION_SCHEMA)\b/gi,
];

export const isCleanInput = (value: string): boolean => {
  return !forbiddenPatterns.some((pattern) => pattern.test(value));
};

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
  .refine((password) => /[0-9]/.test(password), { message: 'password_validate.number' })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: 'password_validate.special',
  })
  .refine(isCleanInput, { message: 'suspicious_input' });

export const emailShema = z.string().trim().min(1, { message: 'required' }).email('email_validate.emailNotValid');

export const nameShema = z
  .string()
  .trim()
  .min(1, { message: 'required' })
  .refine(isCleanInput, { message: 'suspicious_input' });
