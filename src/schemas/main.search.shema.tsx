import { z } from 'zod';

export const MainSearchShema = z.object({
  from: z.object({}, { message: 'required' }),
  to: z.object({}, { message: 'required' }),
});
