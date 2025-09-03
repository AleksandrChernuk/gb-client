// 'use client';

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useLocale, useTranslations } from 'next-intl';

// import { useRouter } from '@/shared/i18n/navigation';
// import { REDIRECT_PATHS } from '../../../config/redirectPaths';

// import { signupSchema, TypeSignup } from '../schemas/forms.schema';
// import { zodResolver } from '@hookform/resolvers/zod';

// import { SignUpInputs } from '../../../config/formInputs';

// import Label from '@/shared/ui/Label';
// import Input from '@/shared/ui/Input';
// import Button from '@/shared/ui/Button';

// import { signup } from '../services/authService';

// import ShowPasswordBtn from '../ui/ShowPasswordBtn';

// const SignupForm = () => {
//   const locale = useLocale();
//   const router = useRouter();
//   const t = useTranslations('FormInputs');
//   const [passwordShow, setPasswordShow] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//   } = useForm<TypeSignup>({
//     resolver: zodResolver(signupSchema),
//     defaultValues: {
//       userName: '',
//       email: '',
//       password: '',
//     },
//     mode: 'onBlur',
//   });

//   const onSubmit = async (data: TypeSignup) => {
//     try {
//       const result = await signup(data, locale);

//       router.push(`${REDIRECT_PATHS.verifyEmail}/${result.email}`);
//       reset();
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error('Signup failed:', error.message);
//       } else {
//         console.error('Signup failed:', String(error));
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full mx-auto flex flex-col gap-y-4">
//       {SignUpInputs.map((item) => (
//         <Label key={item.id} htmlFor={item.id}>
//           <p>{t(`${item.label}`)}</p>
//           <Input
//             id={item.id}
//             type={item.type === 'password' && passwordShow ? 'text' : item.type}
//             aria-required
//             placeholder={item.type !== 'password' ? t(`${item.placeholder}`) : '********'}
//             rightIcon={
//               item.type === 'password' && <ShowPasswordBtn isShow={passwordShow} setIsShow={setPasswordShow} />
//             }
//             {...register(item.name)}
//           />

//           {errors[item.id] && <small className="text-red-400">{t(String(errors[item.id]?.message))}</small>}
//         </Label>
//       ))}
//       <Button type="submit" disabled={isSubmitting} ariaLabel={t('aria_label_button_submit')}>
//         {isSubmitting ? t('button_submitting') : t('button_submit')}
//       </Button>
//     </form>
//   );
// };

// export default SignupForm;
