export const dynamic = 'force-dynamic';
export const revalidate = 0;

import AccountActions from '@/entities/auth/AccountActions';
import AuthCard from '@/entities/auth/AuthCard';
import SigninForm from '@/features/signin-form';
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
    path: `/signin`,
  });
}

export default async function SigninPage() {
  return (
    <section className="w-full">
      <Container size="s" className="py-4 laptop:py-8">
        <div className="mb-4 laptop:mb-8">
          <BackRouteButton />
        </div>
        <div className="relative">
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
        </div>
      </Container>
    </section>
  );
}
