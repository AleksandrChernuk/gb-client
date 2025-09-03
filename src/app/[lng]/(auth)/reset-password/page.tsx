import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/Container';
import BackRouteButton from '@/components/shared/BackRouteButton';
import AuthAssistantCard from '@/components/shared/AuthAssistantCard';

import { MESSAGE_FILES } from '@/config/message.file.constans';
import { getTranslations } from 'next-intl/server';
import ResetPasswordForm from '@/components/modules/auth/ResetPasswordForm';

export default async function ResetPasswordPage() {
  const t = await getTranslations(MESSAGE_FILES.FORM);
  return (
    <section className="w-full">
      <Container size="xs" className="py-4 laptop:py-8">
        <div className="mb-4 laptop:mb-8">
          <BackRouteButton />
        </div>

        <AuthAssistantCard headerLabel="change_password" descriptiontext="otp_enter_code_and_new_password">
          <ResetPasswordForm />
          <p className="my-4 text-center text-xs font-normal tracking-normal leading-[18px] text-red-600 ">
            {t('code_validity')}
          </p>
          <div className="flex flex-col tablet:flex-row">
            <Button asChild variant={'link'}>
              <Link href="/">{t('go_home')}</Link>
            </Button>
          </div>
        </AuthAssistantCard>
      </Container>
    </section>
  );
}
