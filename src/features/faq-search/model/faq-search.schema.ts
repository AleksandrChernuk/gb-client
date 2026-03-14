import { z } from 'zod';

export const FaqSearchSchema = z.object({
  query: z.string().min(1),
});

export type FaqSearchValues = z.infer<typeof FaqSearchSchema>;
