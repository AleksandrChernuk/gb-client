import { Link } from '@/shared/i18n/routing';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import AuthAssistantCard from '@/entities/auth/AuthAssistantCard';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/Container';
import BackRouteButton from '@/shared/ui/BackRouteButton';
import { ConfirmDeleteProfileAction } from '@/features/confirm-delete-profile';
import { getTranslations } from 'next-intl/server';

const ConfirmDeleteAccountPage = async () => {
  const t = await getTranslations(MESSAGE_FILES.FORM);
  const t_common = await getTranslations(MESSAGE_FILES.COMMON);

  return (
    <section className="w-full">
      <ConfirmDeleteProfileAction />
      <Container size="xs" className="py-4 laptop:py-8">
        <div className="mb-4 laptop:mb-8">
          <BackRouteButton />
        </div>
        <AuthAssistantCard
          headerLabel="delete_account_title"
          descriptiontext="delete_account_message"
          descriptionClassName="text-center"
        >
          <p className="text-center my-2 text-lg font-bold leading-6 tracking-normal tablet:text-2xl tablet:leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px]laptop:mb-8 text-green-200">
            {t_common('delete_account_thanks')}
          </p>
          <p className="my-4 text-center text-xs font-normal tracking-normal leading-[18px] text-red-600 ">
            {t_common('delete_account_redirect')}
          </p>
          <div className="text-left mt-4">
            <Button asChild variant={'link'}>
              <Link href="/">{t('go_home')}</Link>
            </Button>
          </div>
        </AuthAssistantCard>
      </Container>
    </section>
  );
};

export default ConfirmDeleteAccountPage;
