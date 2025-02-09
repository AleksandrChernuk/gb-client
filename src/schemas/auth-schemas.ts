import * as z from 'zod';

 

export const createSignupSchema = (t: (key: string) => string) =>
  z.object({
    userName: z.string().min(1, {
      message: t('required'),
    }),
    email: z
      .string()
      .min(1, { message: t('required') })
      .email(t('emailNotValid')),
    password: z.string().min(6, t('passwordLength')),
  });

export const createSigninSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t('required') })
      .email(t('emailNotValid')),
    password: z.string().min(6, t('passwordLength')),
  });

 
