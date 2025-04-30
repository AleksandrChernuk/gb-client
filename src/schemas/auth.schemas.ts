import * as z from 'zod';
import { emailShema, nameShema, passwordShema } from '.';

export const signupSchema = z.object({
  userName: nameShema,
  email: emailShema,
  password: passwordShema,
});

export const signinSchema = z.object({
  email: emailShema,
  password: passwordShema,
});
