// 'use client';

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useLocale, useTranslations } from 'next-intl';

// import { useRouter } from '@/shared/i18n/navigation';
// import { REDIRECT_PATHS } from '../../../config/redirectPaths';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { signinSchema, TypeSignin } from '../schemas/forms.schema';

// import { SignInInputs } from '../../../config/formInputs';

// import Label from '@/shared/ui/Label';
// import Input from '@/shared/ui/Input';
// import Button from '@/shared/ui/Button';

// import ShowPasswordBtn from '../ui/ShowPasswordBtn';
// import { signin } from '../services/authService';
// import { useUserStore } from '@/store/userStore';

// const SigninForm = () => {
//   const locale = useLocale();
//   const router = useRouter();
//   const t = useTranslations('FormInputs');
//   const [passwordShow, setPasswordShow] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//   } = useForm<TypeSignin>({
//     resolver: zodResolver(signinSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//     mode: 'onBlur',
//   });

//   const onSubmit = async (data: TypeSignin) => {
//     try {
//       const result = await signin(data, locale);

//       const { message, currentUser } = result;

//       if (message === '2FA code sent') {
//         router.push(`${REDIRECT_PATHS.verify2FA}/${result.email}`);
//         reset();
//       }

//       if (message === 'Verification code sent') {
//         router.push(`${REDIRECT_PATHS.verifyEmail}/${result.email}`);
//         reset();
//       }

//       if (message === 'Successfully signin') {
//         useUserStore.getState().setUserStore(currentUser);

//         router.push(REDIRECT_PATHS.profile);
//         reset();
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error('Signin failed:', error.message);
//       } else {
//         console.error('Signin failed:', String(error));
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full mx-auto flex flex-col gap-y-4">
//       {SignInInputs.map((item) => (
//         <Label key={item.id} htmlFor={item.id}>
//           <p>{t(`${item.label}`)}</p>
//           <Input
//             id={item.id}
//             type={item.type === 'password' && passwordShow ? 'text' : item.type}
//             autoComplete={item.type === 'email' ? 'email' : undefined}
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

// export default SigninForm;
