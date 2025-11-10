import { useUserStore } from '@/shared/store/useUser';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from '@/shared/i18n/routing';
import { mapServerError } from '@/shared/errors/mapServerError';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { requestChangePassword } from '@/shared/api/auth.service';
import { REDIRECT_PATHS } from '@/shared/configs/redirectPaths';
import { Button } from '@/shared/ui/button';
import { LoadingScreen } from '@/shared/ui/loading-screen';

const ChangePasswordAction = () => {
  const locale = useLocale();
  const router = useRouter();
  const { currentUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations(MESSAGE_FILES.FORM);

  const handleChangePassword = async () => {
    setIsLoading(true);

    if (!currentUser?.email) {
      toast.error(t(mapServerError('')));
      setIsLoading(false);
      return;
    }

    try {
      const result = await requestChangePassword(locale, currentUser.email);

      if (result.email) {
        router.replace(`/${REDIRECT_PATHS.changePassword}?email=${result.email}`);
      } else {
        router.replace(`/${REDIRECT_PATHS.changePassword}?email=${currentUser.email}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(t(mapServerError(error.message)));
      } else {
        toast.error(t(mapServerError('')));
      }
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <LoadingScreen />}
      <Button
        size={'primary'}
        variant={'default'}
        className="w-full"
        disabled={isLoading || currentUser?.method !== 'CREDENTIALS'}
        onClick={handleChangePassword}
      >
        {t('change_password')}
      </Button>
    </div>
  );
};

export default ChangePasswordAction;
