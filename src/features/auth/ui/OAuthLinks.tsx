// 'use client';

// import { useLocale } from 'next-intl';
// import { useTranslations } from 'next-intl';

// import { FcGoogle } from 'react-icons/fc';

// import Button from '@/shared/ui/Button';

// import { googleSignin } from '../services/authService';

// const OAuthLinks = () => {
//   const t = useTranslations('AuthForm');
//   const locale = useLocale();

//   const handleSubmit = () => {
//     googleSignin(locale);
//   };

//   return (
//     <div className="w-full mt-6">
//       <Button
//         variant="outline"
//         leftIcon={<FcGoogle />}
//         className="w-full bg-black text-gray-100 hover:text-black border-none"
//         onClick={handleSubmit}
//         ariaLabel={t('oauth_google')}
//       >
//         {t('oauth_google')}
//       </Button>
//       <div className="w-full flex items-center gap-x-2 mt-6">
//         <div className="w-full h-[1px] bg-white"></div>
//         <span className="shrink-0 text-sm">{t('oauth_line')}</span>
//         <div className="w-full h-[1px] bg-white"></div>
//       </div>
//     </div>
//   );
// };

// export default OAuthLinks;
