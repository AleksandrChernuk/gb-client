// import { Link } from '@/shared/i18n/navigation';
// import { useTranslations } from 'next-intl';

// interface IAuthLinkProps {
//   type: string;
// }

// const AuthLink = ({ type }: IAuthLinkProps) => {
//   const t = useTranslations('AuthForm');

//   return (
//     <div className="flex items-center gap-x-4 text-sm">
//       {type === 'signup' ? (
//         <>
//           <span>{t('have_account')}</span>
//           <Link
//             href={'signin'}
//             className="text-blue-300 shrink-0"
//             aria-label={t('have_account_aria_label_link')}
//           >
//             {t('have_account_link')}
//           </Link>
//         </>
//       ) : (
//         <>
//           <span>{t('no_account')}</span>
//           <Link
//             href={'signup'}
//             className="text-blue-300 shrink-0"
//             aria-label={t('no_account_aria_label_link')}
//           >
//             {t('no_account_link')}
//           </Link>
//         </>
//       )}
//     </div>
//   );
// };

// export default AuthLink;
