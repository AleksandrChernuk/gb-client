import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import AccountActions from './AccountActions';
import AuthSocial from './AuthSocial';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';

interface Props {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
}

export default async function AuthCard({ children, headerLabel, backButtonLabel, backButtonHref }: Props) {
  const t = await getTranslations('common');

  return (
    <Card className="flex flex-col w-full p-4 bg-white laptop:gap-16 shadow-xs tablet:flex-row tablet:justify-between tablet:p-6 laptop:py-10 laptop:px-8 dark:bg-slate-800">
      <div>
        <CardHeader className="p-0 mb-6 space-y-0 text-base font-bold leading-6 tracking-normal text-left tablet:text-2xl tablet:leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px]laptop:mb-8 text-slate-700 dark:text-slate-50">
          {t(`${headerLabel}`)}
        </CardHeader>
        <div className="hidden tablet:block">
          <AccountActions />
        </div>
      </div>

      <div className="tablet:w-1/2">
        <CardContent className="p-0 grow">{children}</CardContent>

        <p className="my-2 text-center text-xs font-normal tracking-normal leading-[18px] text-[#6f8b90] tablet:text-base tablet:leading-6">
          {t('authOr')}
        </p>

        <CardFooter className="p-0">
          <AuthSocial />
        </CardFooter>

        <CardFooter className="flex items-center justify-center p-0 mt-4 truncate gap-x-2 tetx-text-slate-700 dark:text-slate-50 text-nowrap">
          <p className="text-xs  font-bold tracking-normal leading-[16.8px]">
            {backButtonLabel === 'authLogin' ? t('authAlreadyHaveAccount') : t('authDontHaveAccount')}
          </p>
          <Button asChild variant={'link'}>
            <Link
              prefetch={false}
              href={backButtonHref}
              className="underline text-xs font-normal tracking-normal leading-[16.8px]"
              aria-label="go home page"
            >
              {backButtonHref === '/signup' ? t('signinTitle') : t('signupTitle')}
            </Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
