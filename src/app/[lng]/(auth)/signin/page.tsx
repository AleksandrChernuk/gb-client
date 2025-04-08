import AccountActions from '@/components/pages/auth/components/AccountActions';
import AuthCard from '@/components/pages/auth/components/AuthCard';
import SigninForm from '@/components/pages/auth/SigninForm';
import BackRouteButton from '@/components/shared/BackRouteButton';
import { Container } from '@/components/shared/Container';
import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default async function SigninPage({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);
  return (
    <main role="main" className="grow bg-slate-50 dark:bg-slate-900">
      <section className="py-8 laptop:py-16">
        <Container size="s" className="flex flex-col items-start justify-center">
          <div className="mb-4 laptop:mb-8">
            <BackRouteButton />
          </div>

          <AuthCard headerLabel={'signinTitle'} backButtonHref="/signup" backButtonLabel="authCreateAccount">
            <SigninForm />
          </AuthCard>
          <div className="block mt-6 tablet:hidden">
            <AccountActions />
          </div>
        </Container>
      </section>
    </main>
  );
}
