'use client';

import { logout, updateUser } from '@/shared/api/auth.service';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { REDIRECT_PATHS } from '@/shared/configs/redirectPaths';
import { mapServerError } from '@/shared/errors/mapServerError';
import { useRouter } from '@/shared/i18n/routing';

import { useUserStore } from '@/shared/store/useUser';
import { Button } from '@/shared/ui/button';

import { LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

const TwooFaAction = () => {
  const locale = useLocale();
  const router = useRouter();
  const { currentUser, clearUserStore } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations(MESSAGE_FILES.FORM);

  const handleToggle2FA = async () => {
    setIsLoading(true);

    try {
      const newTwoFA = !currentUser?.twoFA;
      await updateUser({ twoFA: newTwoFA }, locale);

      // Очищаем store
      clearUserStore();

      logout();

      router.push(`/${REDIRECT_PATHS.signin}`);
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
    <Button
      size={'primary'}
      variant={'default'}
      onClick={handleToggle2FA}
      className="w-full"
      disabled={isLoading || currentUser?.method !== 'CREDENTIALS'}
    >
      {isLoading ? (
        <LoaderCircle className="animate-spin" stroke="white" />
      ) : (
        <>
          2FA:
          <span className="font-bold">{!currentUser?.twoFA ? <span className="text-red-200">Off</span> : 'On'}</span>
        </>
      )}
    </Button>
  );
};

export default TwooFaAction;
