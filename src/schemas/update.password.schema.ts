import { z } from 'zod';
import { passwordShema } from '.';

export const updatePpasswordSchema = z
  .object({
    password: passwordShema,
    confirmPassword: z.string().trim().min(1, { message: 'required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwordMismatchErrorMessage',
    path: ['confirmPassword'],
  });
