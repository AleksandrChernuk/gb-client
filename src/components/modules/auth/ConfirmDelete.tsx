'use client';

import { logout } from '@/actions/auth.service';
import AuthAssistantCard from '@/components/shared/AuthAssistantCard';
import { Button } from '@/components/ui/button';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { Link } from '@/i18n/routing';
import { useUserStore } from '@/store/useUser';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useEffect } from 'react';

const ConfirmDelete = () => {
  const router = useRouter();
  const { clearUserStore } = useUserStore();
  const t = useTranslations(MESSAGE_FILES.FORM);
  const t_common = useTranslations(MESSAGE_FILES.COMMON);

  useEffect(() => {
    const cleanupAndRedirect = async () => {
      clearUserStore();
      await logout();

      const timer = setTimeout(() => {
        router.push(`/`);
      }, 10000);

      return () => clearTimeout(timer);
    };

    cleanupAndRedirect();
  }, [clearUserStore, router]);

  return (
    <AuthAssistantCard
      headerLabel="delete_account_title"
      descriptiontext="delete_account_message"
      descriptionClassName="text-center"
    >
      <p className="text-center my-2 text-lg font-bold leading-6 tracking-normal tablet:text-2xl tablet:leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px]laptop:mb-8 text-green-300">
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
  );
};

export default ConfirmDelete;
