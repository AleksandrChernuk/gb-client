import Link from 'next/link';
import AuthAssistantCard from '@/components/shared/AuthAssistantCard';
import { Container } from '@/components/shared/Container';
import BackRouteButton from '@/components/shared/BackRouteButton';
import { Button } from '@/components/ui/button';
import Verify2FAForm from '@/components/modules/auth/Verify2FAForm';
import { getTranslations } from 'next-intl/server';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { Params } from '@/types/common.types';
import { notFound } from 'next/navigation';

type Props = {
  params: Params;
};

const Verify2FAPage = async ({ params }: Props) => {
  const { email } = await params;

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
      </Container>
    </section>
  );
};

export default Verify2FAPage;
