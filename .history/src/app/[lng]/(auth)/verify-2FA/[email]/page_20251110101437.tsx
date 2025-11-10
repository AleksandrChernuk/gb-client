import Link from 'next/link';

import { Params } from '@/shared/types/common.types';
import { notFound } from 'next/navigation';
import { Container } from '@/shared/ui/Container';
import { getTranslations } from 'next-intl/server';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import BackRouteButton from '@/shared/ui/BackRouteButton';
import AuthAssistantCard from '@/entities/auth/AuthAssistantCard';
import Verify2FAForm from '@/features/verify-2fa-form';
import { Button } from '@/shared/ui/button';
import { Locale } from '@/shared/i18n/locales';
import { generatePrivatePageMetadata } from '@/shared/lib/metadata';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng, email } = (await params) as { lng: Locale; email: string };
  return await generatePrivatePageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'auth',
    path: `/verify-2FA/${email}`,
  });
}

const Verify2FAPage = async ({ params }: Props) => {
  const { email } = await params;
  console.log(email);

  if (!email) {
    notFound();
  }

  const t = await getTranslations(MESSAGE_FILES.FORM);

  return (
    <section className="w-full">
      <Container size="xs" className="py-4 laptop:py-8">
        <div className="mb-4 laptop:mb-8">
          <BackRouteButton />
        </div>
        <div className="relative">
          <AuthAssistantCard
            headerLabel="twofa_title"
            descriptiontext="twofa_description"
            descriptionClassName="text-center"
          >
            <Verify2FAForm email={email} />
            <p className="my-4 text-center text-xs font-normal tracking-normal leading-[18px] text-red-600 ">
              {t('code_validity')}
            </p>
            <div>
              <Button asChild variant={'link'}>
                <Link href="/">{t('go_home')}</Link>
              </Button>
            </div>
          </AuthAssistantCard>
        </div>
      </Container>
    </section>
  );
};

export default Verify2FAPage;
