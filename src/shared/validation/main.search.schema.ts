import { z } from 'zod';

export const MainSearchShema = z.object({
  from: z.string({ message: 'required' }),
  to: z.string({ message: 'required' }),
});
