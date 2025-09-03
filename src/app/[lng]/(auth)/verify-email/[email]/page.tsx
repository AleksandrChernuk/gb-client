'use client';

import { useParams, useRouter } from 'next/navigation';

import { useLocale } from 'next-intl';

import { TypeVerifyCode } from '@/types/auth.types';
import { verifyEmail } from '@/actions/auth.service';
import { useUserStore } from '@/store/useUser';
import { REDIRECT_PATHS } from '@/config/redirectPaths';
import OtpVerifyForm from '@/components/modules/auth/OtpVerifyForm';
import BackRouteButton from '@/components/shared/BackRouteButton';
import { Container } from '@/components/shared/Container';
import AuthAssistantCard from '@/components/shared/AuthAssistantCard';
import ResendCode from '@/components/modules/auth/ResendCode';

const VerifyEmailPage = () => {
  const locale = useLocale();
  const router = useRouter();
  const params = useParams<{ tag: string; email: string }>();
  const email = decodeURIComponent(params?.email || '');

  const handleSubmit = async (data: TypeVerifyCode) => {
    try {
      const result = await verifyEmail(data, locale);

      const { message, currentUser } = result;

      if (message !== 'Successfully signin' || !currentUser) {
        throw new Error('Invalid server response');
      }

      useUserStore.getState().setUserStore(currentUser);

      router.push(REDIRECT_PATHS.profile);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Verification failed:', error.message);
      } else {
        console.error('Verification failed:', String(error));
      }
    }
  };

  return (
    <section className="w-full">
      <Container size="xs" className="py-4 laptop:py-8">
        <div className="mb-4 laptop:mb-8">
          <BackRouteButton />
        </div>

        <AuthAssistantCard headerLabel="otpVerifyTitle">
          <OtpVerifyForm length={6} email={email} onSubmit={handleSubmit} autoSubmit={true} />
          {email && <ResendCode email={email} locale={locale} type="VERIFICATION" className="mt-10" />}
        </AuthAssistantCard>
      </Container>
    </section>
  );
};

export default VerifyEmailPage;
