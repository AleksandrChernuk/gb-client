'use client';

import { logout } from '@/shared/api/auth.service';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { mapServerError } from '@/shared/errors/mapServerError';
import { useRouter } from '@/shared/i18n/routing';
import { useUserStore } from '@/shared/store/useUser';
import { Button } from '@/shared/ui/button';
import { LoadingScreen } from '@/shared/ui/loading-screen';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

const LogOutProfileBtn = () => {
  const t = useTranslations(MESSAGE_FILES.PROFILE);
  const t_form = useTranslations(MESSAGE_FILES.FORM);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const userStore = useUserStore();
  const handleLogout = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await logout();

      userStore.clearUserStore();

      router.replace(`/`);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        toast.error(t_form(mapServerError(error.message)));
      } else {
        toast.error(t_form(mapServerError('')));
      }
    }
  };
  return (
    <div>
      {isLoading && <LoadingScreen />}

      <Button onClick={handleLogout} variant="outline" size={'primary'} className="text-slate-700 dark:text-slate-200">
        {t('logout')}
      </Button>
    </div>
  );
};

export default LogOutProfileBtn;
