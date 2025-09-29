import { z } from 'zod';

export const MainSearchShema = z.object({
  from: z.number({ message: 'required' }),
  to: z.number({ message: 'required' }),
});
