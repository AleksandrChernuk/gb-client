import { z } from 'zod';

const userResponseSchema = z.object({
  id: z.string(),
  userName: z.string(),
  email: z.string(),
  picture: z.string().nullable(),
  twoFA: z.boolean(),
});

export const signupResponseSchema = z.object({
  message: z.string(),
  email: z.string(),
});

export const signinResponseSchema = z.object({
  message: z.string().optional(),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
  deviceId: z.string().optional(),
  email: z.string().optional(),
  user: userResponseSchema,
});

export const signin2FAResponseSchema = z.object({
  message: z.string(),
  email: z.string().optional(),
});
