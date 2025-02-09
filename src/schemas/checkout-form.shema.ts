import { z } from 'zod';

export const CheckoutSchema = z.object({
  passengers: z.array(
    z.object({
      id: z.string(),
      isChildren: z.boolean(),
      name: z.string().min(1, 'Name is required'),
      surname: z.string().min(1, 'Surname is required'),
      notes: z.string().optional(),
      dob: z.string().min(1, 'Date of birth is required'), // Можно сделать дату через z.date()
    })
  ),
  payment: z.enum(['card', 'paypal', 'cash']), // Подставь варианты из TPayment
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone number is required'),
  accept_rules: z.boolean().refine((val) => val === true, {
    message: 'You must accept the rules',
  }),
  processing_data: z.boolean().refine((val) => val === true, {
    message: 'You must agree to data processing',
  }),
});
