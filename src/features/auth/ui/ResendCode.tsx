// import { useState } from 'react';

// import { resendCode } from '../services/authService';

// import { TypeResendCode } from '../types/authRequest.type';
// import { cn } from '@/shared/lib/clsx';

// interface ResendCodeProps {
//   email: string;
//   locale: string;
//   type:
//     | 'VERIFICATION'
//     | 'TWO_FACTOR'
//     | 'CHANGE_EMAIL'
//     | 'RESET_PASSWORD'
//     | 'DELETE_ACCOUNT'
//     | 'NEW_DEVICE_LOGIN';
//   className?: string;
// }

// const ResendCode = ({ email, locale, type, className }: ResendCodeProps) => {
//   const [error, setError] = useState<string>('');
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const handleSubmit = async () => {
//     setError('');
//     setIsLoading(true);

//     const data: TypeResendCode = { email, type };

//     try {
//       const result = await resendCode(data, locale);

//       if (result === 'Code resent') {
//         // Надо показать в всплывающем окне сообщение, что код отправлен повторно
//         console.log('Код повторно отправлен');
//       }
//     } catch (err) {
//       if (err instanceof Error) {
//         setError('Произошла ошибка. Попробуйте позже.');
//       }
//       // Надо показать в всплывающем окне сообщение об ошибке
//       console.log('Ошибка:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="w-full flex flex-col items-end">
//       <button
//         onClick={() => {
//           handleSubmit();
//         }}
//         disabled={isLoading}
//         className={cn('text-foreground cursor-pointer', className)}
//       >
//         {isLoading ? 'Отправка...' : 'Отправить код повторно'}
//       </button>
//       {error && <div className="text-red-400">{error}</div>}
//     </div>
//   );
// };

// export default ResendCode;
