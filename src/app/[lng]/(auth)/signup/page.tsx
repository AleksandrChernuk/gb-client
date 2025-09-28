export const dynamic = 'force-dynamic';
export const revalidate = 0;

import AccountActions from '@/entities/auth/AccountActions';
import AuthCard from '@/entities/auth/AuthCard';
import SignupForm from '@/features/signup-form';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Locale } from '@/shared/i18n/locales';
import { generatePrivatePageMetadata } from '@/shared/lib/metadata';
import { Params } from '@/shared/types/common.types';
import BackRouteButton from '@/shared/ui/BackRouteButton';
import { Container } from '@/shared/ui/Container';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  return generatePrivatePageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'auth',
    path: `/signup`,
  });
}

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
