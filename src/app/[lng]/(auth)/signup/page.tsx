import SignupForm from '@/components/modules/auth/SignupForm';
import AccountActions from '@/components/shared/AccountActions';
import AuthCard from '@/components/shared/AuthCard';
import BackRouteButton from '@/components/shared/BackRouteButton';
import { Container } from '@/components/shared/Container';
import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default async function SignupPage({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);
  return (
    <section className="py-8 laptop:py-16">
      <Container size="s" className="flex flex-col items-start justify-center">
        <div className="mb-4 laptop:mb-8">
          <BackRouteButton />
        </div>
        <AuthCard headerLabel={'signupTitle'} backButtonHref="/signin" backButtonLabel="authLogin">
          <SignupForm />
        </AuthCard>
        <div className="block mt-6 tablet:hidden">
          <AccountActions />
        </div>
      </Container>
    </section>
  );
}
