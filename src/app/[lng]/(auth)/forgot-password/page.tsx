export const dynamic = 'force-dynamic';
export const revalidate = 0;

import AuthAssistantCard from '@/entities/auth/AuthAssistantCard';
import ForgotPasswordForm from '@/features/forgot-password-form';
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
  return generatePrivatePageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'auth',
    path: `/forgot-password`,
  });
}

export default async function ForgotPasswordPage() {
  const t = await getTranslations(MESSAGE_FILES.FORM);

  return (
    <section className="w-full">
      <Container size="xs" className="py-4 laptop:py-8">
        <div className="mb-4 laptop:mb-8">
          <BackRouteButton />
        </div>
        <div className="relative">
          <AuthAssistantCard headerLabel="reset_password_title" descriptiontext="reset_password_text">
            <ForgotPasswordForm />
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
