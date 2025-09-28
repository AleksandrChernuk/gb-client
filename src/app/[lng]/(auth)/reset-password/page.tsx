export const dynamic = 'force-dynamic';
export const revalidate = 0;

import AuthAssistantCard from '@/entities/auth/AuthAssistantCard';
import ResetPasswordForm from '@/features/reset-password-form';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Locale } from '@/shared/i18n/locales';
import { generatePrivatePageMetadata } from '@/shared/lib/metadata';
import { Params } from '@/shared/types/common.types';
import BackRouteButton from '@/shared/ui/BackRouteButton';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/Container';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  return generatePrivatePageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'auth',
    path: `/reset-password`,
  });
}

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
