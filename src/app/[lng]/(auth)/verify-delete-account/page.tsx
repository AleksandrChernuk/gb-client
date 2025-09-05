import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { Container } from '@/components/shared/Container';
import BackRouteButton from '@/components/shared/BackRouteButton';
import AuthAssistantCard from '@/components/shared/AuthAssistantCard';
import VerifyDeleteAccountForm from '@/components/modules/auth/VerifyDeleteAccountForm';

export default async function VerifyDeleteAccountPage() {
  const t = await getTranslations(MESSAGE_FILES.FORM);

  return (
    <section className="w-full">
      <Container size="xs" className="py-4 laptop:py-8">
        <div className="mb-4 laptop:mb-8">
          <BackRouteButton />
        </div>

        <AuthAssistantCard headerLabel="delete_account_warning" descriptiontext="delete_account_text">
          <VerifyDeleteAccountForm />
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
