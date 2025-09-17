export const dynamic = 'force-dynamic';
export const revalidate = 0;

import SignupForm from '@/components/modules/auth/SignupForm';
import AccountActions from '@/components/shared/AccountActions';
import AuthCard from '@/components/shared/AuthCard';
import BackRouteButton from '@/components/shared/BackRouteButton';
import { Container } from '@/components/shared/Container';

export default async function SignupPage() {
  return (
    <section className="w-full">
      <Container size="s" className="py-4 laptop:py-8">
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
