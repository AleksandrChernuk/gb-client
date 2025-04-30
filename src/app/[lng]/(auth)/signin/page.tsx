import SigninForm from '@/components/modules/auth/SigninForm';
import AccountActions from '@/components/shared/AccountActions';
import AuthCard from '@/components/shared/AuthCard';
import BackRouteButton from '@/components/shared/BackRouteButton';
import { Container } from '@/components/shared/Container';
import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
export async function generateMetadata() {
  return {
    robots: {
      index: false,
      follow: false,
      nocache: false,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function SigninPage({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);
  return (
    <section className="w-full">
      <Container size="s" className="flex flex-col items-start justify-center py-4">
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
  );
}
