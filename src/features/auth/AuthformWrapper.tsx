// import { ReactNode } from 'react';

// import { useTranslations } from 'next-intl';

// import AuthLink from './ui/AuthLink';
// import OAuthLinks from './ui/OAuthLinks';
// import ForgotPassword from './ui/ForgotPassword';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// interface IAuthFormProps {
//   children: ReactNode;
//   title?: string;
//   description?: string;
//   isOauth?: boolean;
//   isAuthLink?: boolean;
//   isForgotPass?: boolean;
//   type?: string;
// }

// const AuthFormWrapper = ({
//   children,
//   title,
//   description,
//   isOauth = false,
//   isAuthLink = false,
//   isForgotPass = false,
//   type = '',
// }: IAuthFormProps) => {
//   const t = useTranslations('AuthForm');

//   return (
//     <Card className="max-w-100 mx-auto pb-0">
//       {(title || description || isOauth) && (
//         <CardHeader>
//           {title && <CardTitle className="text-xl">{t(title)}</CardTitle>}
//           {description && <CardDescription>{t(description)}</CardDescription>}
//           {isOauth && <OAuthLinks />}
//         </CardHeader>
//       )}
//       <CardContent>{children}</CardContent>
//       <CardFooter className="flex flex-col items-start gap-y-2">
//         {isAuthLink && <AuthLink type={type} />}
//         {isForgotPass && <ForgotPassword />}
//       </CardFooter>
//     </Card>
//   );
// };

// export default AuthFormWrapper;
