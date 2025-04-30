import * as z from 'zod';
import { emailShema } from '.';

export const ResetPasswordShema = z.object({
  email: emailShema,
});
