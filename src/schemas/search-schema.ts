import * as z from "zod";

export const SearchSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  date: z.date(),
  passenger: z.object({
    adults: z.number().min(1, "Должен быть хотя бы 1 взрослый").max(10, "Не более 10 взрослых"),
    children: z.number().min(0, "Детей может быть 0").max(5, "Не более 5 детей"),
  }),
});
