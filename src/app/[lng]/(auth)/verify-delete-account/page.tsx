import AuthAssistantCard from '@/entities/auth/AuthAssistantCard';
import VerifyDeleteAccountForm from '@/features/delete-profile-form';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Locale } from '@/shared/i18n/locales';
import { Link } from '@/shared/i18n/routing';
import { generatePrivatePageMetadata } from '@/shared/lib/metadata';
import { Params } from '@/shared/types/common.types';
import BackRouteButton from '@/shared/ui/BackRouteButton';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/Container';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  return await generatePrivatePageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'auth',
    path: `/verify-delete-account`,
  });
}

export default async function VerifyDeleteAccountPage() {
  const t = await getTranslations(MESSAGE_FILES.FORM);

  return (
    <section className="w-full">
      <Container size="xs" className="py-4 laptop:py-8">
        <div className="mb-4 laptop:mb-8">
          <BackRouteButton />
        </div>
        <div className="relative">
          <AuthAssistantCard headerLabel="delete_account_warning" descriptiontext="delete_account_text">
            <VerifyDeleteAccountForm />
            <div className="text-left mt-4">
              <Button asChild variant={'link'}>
                <Link href="/">{t('go_home')}</Link>
              </Button>
            </div>
          </AuthAssistantCard>
        </div>
      </Container>
    </section>
  );
}
