// 'use client';

// import Input from '@/shared/ui/Input';
// import Button from '@/shared/ui/Button';

// import { useTranslations } from 'next-intl';

// import { useTotp } from '../../../hooks/useTotp';

// import { TypeVerifyCode } from '../types/authRequest.type';

// interface InputOtpProps {
//   length?: number;
//   email: string;
//   onSubmit?: (data: TypeVerifyCode) => Promise<void>;
//   autoSubmit?: boolean;
// }

// const TotpForm = ({
//   length = 6,
//   onSubmit,
//   email,
//   autoSubmit = false,
// }: InputOtpProps) => {
//   const {
//     code,
//     error,
//     inputRefs,
//     fullCode,
//     handleInputChange,
//     handlePaste,
//     handleKeyDown,
//     handleReset,
//     handleSubmit,
//   } = useTotp({
//     length,
//     onSubmit,
//     email,
//     autoSubmit,
//   });
//   const t = useTranslations('AuthForm');

//   return (
//     <div className="flex flex-col mx-auto">
//       <h2 className="mb-2">{t('totp_verify_code')}</h2>
//       <div className={`w-full grid gap-x-4 grid-cols-6`}>
//         {Array.from({ length }).map((_, idx) => (
//           <Input
//             key={idx}
//             type="text"
//             id={`otp-${idx}`}
//             value={code[idx]}
//             isInvalid={!!error}
//             onChange={(e) => handleInputChange(e, idx)}
//             onPaste={handlePaste}
//             onKeyDown={(e) => handleKeyDown(e, idx)}
//             ref={(el) => {
//               inputRefs.current[idx] = el;
//             }}
//             maxLength={1}
//             className="text-center"
//             aria-label={`TOTP digit ${idx + 1}`}
//           />
//         ))}
//       </div>
//       {error && <p className="mt-2 text-red-400 animate-fade-in">{error}</p>}
//       <div className="flex items-center justify-center gap-x-8 mt-5">
//         <Button type="button" onClick={handleReset}>
//           RESET
//         </Button>
//         <Button
//           type="button"
//           onClick={handleSubmit}
//           disabled={fullCode().length < length}
//         >
//           SUBMIT
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default TotpForm;
