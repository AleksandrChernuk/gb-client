import { emailShema, isCleanInput, nameShema, passwordShema } from '@/schemas/schemas.constans';
import * as z from 'zod';

export const signupSchema = z.object({
  userName: nameShema,
  email: emailShema,
  password: passwordShema,
});

export const signinSchema = z.object({
  email: emailShema,
  password: passwordShema,
});

export const otpVerifySchema = z.object({
  pin: z
    .string()
    .min(1, { message: 'required' })
    .regex(/^\d{6}$/, { message: 'invalid' })
    .refine(isCleanInput, { message: 'suspicious_input' }),
});

export const ResetPasswordShema = z.object({
  email: emailShema,
});

export const updatePpasswordSchema = z
  .object({
    password: passwordShema,
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: 'required' })
      .refine(isCleanInput, { message: 'suspicious_input' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwordMismatchErrorMessage',
    path: ['confirmPassword'],
  });
