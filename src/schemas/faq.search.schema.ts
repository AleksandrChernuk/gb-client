import * as z from 'zod';

export const FaqSearchShema = z.object({ qwery: z.string().min(3, { message: 'min 3 leters' }) });
