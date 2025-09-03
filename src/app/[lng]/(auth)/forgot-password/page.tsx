import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import AuthAssistantCard from '@/components/shared/AuthAssistantCard';
import { Container } from '@/components/shared/Container';
import BackRouteButton from '@/components/shared/BackRouteButton';
import ForgotPasswordForm from '@/components/modules/auth/ForgotPasswordForm';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { getTranslations } from 'next-intl/server';

export default async function ForgotPasswordPage() {
  const t = await getTranslations(MESSAGE_FILES.FORM);

  return (
    <section className="w-full">
      <Container size="xs" className="py-4 laptop:py-8">
        <div className="mb-4 laptop:mb-8">
          <BackRouteButton />
        </div>

        <AuthAssistantCard headerLabel="reset_password_title" descriptiontext="reset_password_text">
          <ForgotPasswordForm />
          <div className="text-left mt-4">
            <Button asChild variant={'link'}>
              <Link href="/">{t('go_home')}</Link>
            </Button>
          </div>
        </AuthAssistantCard>
      </Container>
    </section>
  );
}
