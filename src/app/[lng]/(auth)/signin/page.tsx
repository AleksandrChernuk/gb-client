export const dynamic = 'force-dynamic';
export const revalidate = 0;

import AccountActions from '@/entities/auth/AccountActions';
import AuthCard from '@/entities/auth/AuthCard';
import SigninForm from '@/features/signin-form';
import BackRouteButton from '@/shared/ui/BackRouteButton';
import { Container } from '@/shared/ui/Container';

export default async function SigninPage() {
  return (
    <section className="w-full">
      <Container size="s" className="py-4 laptop:py-8">
        <div className="mb-4 laptop:mb-8">
          <BackRouteButton />
        </div>
        <AuthCard
          headerLabel={'signinTitle'}
          backButtonHref="/signup"
          backButtonLabel="authCreateAccount"
          forgotButtonHref="/forgot-password"
          forgotButtonLabel="resetPasBtn"
        >
          <SigninForm />
        </AuthCard>
        <div className="block mt-6 tablet:hidden">
          <AccountActions />
        </div>
      </Container>
    </section>
  );
}
