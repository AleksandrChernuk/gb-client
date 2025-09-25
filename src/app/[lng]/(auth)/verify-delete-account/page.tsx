import AuthAssistantCard from '@/entities/auth/AuthAssistantCard';
import VerifyDeleteAccountForm from '@/features/delete-profile-form';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Link } from '@/shared/i18n/routing';
import BackRouteButton from '@/shared/ui/BackRouteButton';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/Container';
import { getTranslations } from 'next-intl/server';

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
