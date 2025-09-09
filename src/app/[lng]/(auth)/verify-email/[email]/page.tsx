import BackRouteButton from '@/components/shared/BackRouteButton';
import { Container } from '@/components/shared/Container';
import AuthAssistantCard from '@/components/shared/AuthAssistantCard';
import VerifyEmailFrom from '@/components/modules/auth/VerifyEmailFrom';
import { getTranslations } from 'next-intl/server';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { Params } from '@/types/common.types';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

type Props = {
  params: Params;
};

const VerifyEmailPage = async ({ params }: Props) => {
  const { email } = await params;
  const t = await getTranslations(MESSAGE_FILES.FORM);
  console.log(email);

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
