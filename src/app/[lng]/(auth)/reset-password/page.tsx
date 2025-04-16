import ForgotPasswordForm from '@/components/modules/auth/ForgotPasswordForm';
import AuthAssistantCard from '@/components/shared/AuthAssistantCard';
import BackRouteButton from '@/components/shared/BackRouteButton';
import { Container } from '@/components/shared/Container';
import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default async function ResetPage({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);
  return (
    <section className="py-8 laptop:py-16">
      <Container size="s">
        <div className="mb-4 laptop:mb-8">
          <BackRouteButton />
        </div>

        <AuthAssistantCard headerLabel="Forgot Password">
          <ForgotPasswordForm />
        </AuthAssistantCard>
      </Container>
    </section>
  );
}
