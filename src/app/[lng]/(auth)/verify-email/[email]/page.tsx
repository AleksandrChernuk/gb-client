import AuthAssistantCard from '@/entities/auth/AuthAssistantCard';
import VerifyEmailFrom from '@/features/verify-email-form';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Link } from '@/shared/i18n/routing';
import { Params } from '@/shared/types/common.types';
import BackRouteButton from '@/shared/ui/BackRouteButton';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/Container';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

type Props = {
  params: Params;
};

const VerifyEmailPage = async ({ params }: Props) => {
  const { email } = await params;
  const t = await getTranslations(MESSAGE_FILES.FORM);

  if (!email) {
    notFound();
  }

  return (
    <section className="w-full">
      <Container size="xs" className="py-4 laptop:py-8">
        <div className="mb-4 laptop:mb-8">
          <BackRouteButton />
        </div>

        <AuthAssistantCard headerLabel="otpVerifyTitle">
          <VerifyEmailFrom email={email} />
          <p className="my-4 text-center text-xs font-normal tracking-normal leading-[18px] text-red-600 ">
            {t('code_validity')}
          </p>
          <div>
            <Button asChild variant={'link'}>
              <Link href="/">{t('go_home')}</Link>
            </Button>
          </div>
        </AuthAssistantCard>
      </Container>
    </section>
  );
};

export default VerifyEmailPage;
