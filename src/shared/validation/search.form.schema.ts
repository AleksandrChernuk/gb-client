import * as z from 'zod';

export const SearchSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  date: z.date(),
  voyagers: z.number().min(1, 'Должен быть хотя бы 1 взрослый').max(20, 'Не более 10 взрослых'),
});
