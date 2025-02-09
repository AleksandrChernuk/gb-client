'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
 
 import { Button } from '@/components/ui/button';
 import { CircleAlert } from 'lucide-react';
 import { useTranslation } from 'react-i18next';
 import { createSignupSchema } from '@/schemas/auth-schemas';
 import ViewPassword from './components/ViewPassword';
 import FormError from './components/FormError';

 const SignupForm = () => {
   const { t } = useTranslation(['common']);
   const SignupSchema = createSignupSchema(t);

   const [error, setError] = useState<string | undefined>('');
   const [isPending, startTransition] = useTransition();
   const [isViewPassword, setIsViewPassword] = useState(false);

   const form = useForm<z.infer<typeof SignupSchema>>({
     resolver: zodResolver(SignupSchema),
     defaultValues: {
       userName: '',
       email: '',
       password: '',
     },
   });

   const onSubmit = (values: z.infer<typeof SignupSchema>) => {
     console.log(values);
     setError('');

     startTransition(() => {});
   };

   return (
     <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6' noValidate>
         <div className='space-y-4'>
           <FormField
             control={form.control}
             name='userName'
             render={({ field, fieldState }) => {
               return (
                 <FormItem>
                   <FormLabel className='mb-2 secondary_text text-black_2_for_text dark:text-white'>
                     {t('authName')}
                   </FormLabel>
                   <FormControl>
                     <div className='relative'>
                       <Input
                         {...field}
                         disabled={isPending}
                         type='text'
                         placeholder={t('placeholderName')}
                         className={`${Boolean(fieldState?.error) && 'border-red focus:border-red bg-red_input placeholder:text-red  dark:bg-background_black_mode'}`}
                       />
                       {Boolean(fieldState?.invalid) && (
                         <div className='absolute inset-y-0 flex items-center cursor-pointer pointer-events-none right-4'>
                           <CircleAlert className='stroke-red ' />
                         </div>
                       )}
                     </div>
                   </FormControl>
                   <FormMessage className='text-red' />
                 </FormItem>
               );
             }}
           />
           <FormField
             control={form.control}
             name='email'
             render={({ field, fieldState }) => (
               <FormItem>
                 <FormLabel className='mb-2 secondary_text text-black_2_for_text dark:text-white'>
                   {t('authEmail')}
                 </FormLabel>
                 <FormControl>
                   <div className='relative'>
                     <Input
                       {...field}
                       onChange={(e) => {
                         field.onChange(e.target.value.trim());
                       }}
                       disabled={isPending}
                       type='email'
                       placeholder='user@example.com'
                       autoComplete='off'
                       className={`${Boolean(fieldState?.error) && 'border-red focus:border-red bg-red_input placeholder:text-red  dark:bg-background_black_mode'}`}
                     />
                     {Boolean(fieldState?.error) && (
                       <div className='absolute inset-y-0 flex items-center cursor-pointer pointer-events-none right-4'>
                         <CircleAlert className='stroke-red' />
                       </div>
                     )}
                   </div>
                 </FormControl>
                 <FormMessage className='text-red' />
               </FormItem>
             )}
           />
           <FormField
             control={form.control}
             name='password'
             render={({ field, fieldState }) => (
               <FormItem>
                 <FormLabel className='mb-2 secondary_text text-black_2_for_text dark:text-white'>
                   {t('authPassword')}
                 </FormLabel>
                 <FormControl>
                   <div className='relative'>
                     <Input
                       {...field}
                       disabled={isPending}
                       type={!isViewPassword ? 'password' : 'text'}
                       placeholder='******'
                       className={`${Boolean(fieldState?.error) && 'border-red focus:border-red bg-red_input placeholder:text-red  dark:bg-background_black_mode'}`}
                     />
                     <ViewPassword
                       error={Boolean(fieldState?.error)}
                       isViewPassword={isViewPassword}
                       setIsViewPassword={() => setIsViewPassword((prev) => !prev)}
                     />
                   </div>
                 </FormControl>
                 <FormMessage className='text-red' />
               </FormItem>
             )}
           />
         </div>
         <FormError message={error} />

         <Button
           type='submit'
           className='w-full py-[14px] px-6  tablet:py-4 text-white rounded-full h5 max-h-[48px] tablet:max-h-[52px] '
           disabled={isPending}
         >
           {t('signinTitle')}
         </Button>
       </form>
     </Form>
   );
 };

export default SignupForm;
