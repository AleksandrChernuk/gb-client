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
    <Card className="flex flex-col w-full p-4 bg-white laptop:gap-16 shadow-custom_card tablet:flex-row tablet:justify-between tablet:p-6 laptop:py-10 laptop:px-8 dark:bg-dark_main">
      <div>
        <CardHeader className="p-0 mb-6 space-y-0 text-left h5 tablet:h3 laptop:h1 laptop:mb-8 text-text_prymery">
          {t(`${headerLabel}`)}
        </CardHeader>
        <div className="hidden tablet:block">
          <AccountActions />
        </div>
      </div>

      <div className="tablet:w-1/2">
        <CardContent className="grow p-0">{children}</CardContent>

        <p className="my-2 text-center small_text text-gray_2_for_body tablet:h5">{t('authOr')}</p>

        <CardFooter className="p-0">
          <AuthSocial />
        </CardFooter>

        <CardFooter className="flex items-center justify-center p-0 mt-4 truncate gap-x-2 tetx-text-text_prymery text-nowrap">
          <p className="text-xs  font-bold tracking-normal leading-[16.8px]">
            {backButtonLabel === 'authLogin' ? t('authAlreadyHaveAccount') : t('authDontHaveAccount')}
          </p>
          <Button asChild variant={'link'}>
            <Link
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
