import { z } from 'zod';

export const OtpVerifySchema = z.object({
  pin: z
    .string()
    .min(1, { message: 'required' })
    .regex(/^\d{6}$/, { message: 'invalid' }),
});
