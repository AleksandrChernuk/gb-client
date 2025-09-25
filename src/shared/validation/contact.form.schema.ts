import * as z from 'zod';
import { emailShema } from './schemas.constans';

export const contactSchema = z.object({
  firstName: z.string().min(1, { message: 'required' }),
  text: z.string().min(1, { message: 'required' }),
  email: emailShema,
});
