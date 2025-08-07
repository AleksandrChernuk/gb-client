import * as z from 'zod';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { emailShema, isCleanInput } from './schemas.constans';

export const cooperationSchema = z.object({
  firstName: z.string().min(1, { message: 'required' }).refine(isCleanInput, { message: 'suspicious_input' }),
  company: z.string().min(1, { message: 'required' }).refine(isCleanInput, { message: 'suspicious_input' }),
  type: z.string().min(1, { message: 'required' }).refine(isCleanInput, { message: 'suspicious_input' }),
  email: emailShema,
  phone: z
    .string()
    .min(8, { message: 'required' })
    .refine(
      (value) => {
        const phoneNumber = parsePhoneNumberFromString(value);
        return phoneNumber ? phoneNumber.isValid() : false;
      },
      { message: 'invalid_number' },
    )
    .refine(isCleanInput, { message: 'suspicious_input' }),
});
