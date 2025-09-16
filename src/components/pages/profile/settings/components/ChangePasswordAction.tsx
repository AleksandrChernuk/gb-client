import { requestChangePassword } from '@/actions/auth.service';
import { Button } from '@/components/ui/button';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { REDIRECT_PATHS } from '@/config/redirectPaths';
import { useUserStore } from '@/store/useUser';
import { mapServerError } from '@/utils/mapServerError';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useState } from 'react';
import { toast } from 'sonner';

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
        router.replace(`/${locale}/${REDIRECT_PATHS.changePassword}?email=${result.email}`);
      } else {
        router.replace(`/${locale}/${REDIRECT_PATHS.changePassword}?email=${currentUser.email}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(t(mapServerError(error.message)));
      } else {
        toast.error(t(mapServerError('')));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
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
