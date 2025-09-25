export const dynamic = 'force-dynamic';
export const revalidate = 0;

import AuthAssistantCard from '@/entities/auth/AuthAssistantCard';
import ChangePasswordForm from '@/features/change-password-form';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import BackRouteButton from '@/shared/ui/BackRouteButton';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/Container';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function ChangePasswordPage() {
  const t = await getTranslations(MESSAGE_FILES.FORM);

  return (
    <section className="w-full">
      <Container size="xs" className="py-4 laptop:py-8">
        <div className="mb-4 laptop:mb-8">
          <BackRouteButton />
        </div>

        <AuthAssistantCard headerLabel="change_password_title">
          <ChangePasswordForm />
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
}
