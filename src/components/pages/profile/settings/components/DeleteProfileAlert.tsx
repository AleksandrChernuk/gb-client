'use client';

import { requestDeleteAccount } from '@/actions/auth.service';
import { Button } from '@/components/ui/button';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { REDIRECT_PATHS } from '@/config/redirectPaths';
import { useUserStore } from '@/store/useUser';
import { mapServerError } from '@/utils/mapServerError';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'use-intl';

type Props = {
  setActiveForm: () => void;
};

const DeleteProfileAlert = ({ setActiveForm }: Props) => {
  const locale = useLocale();
  const router = useRouter();
  const { currentUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations(MESSAGE_FILES.FORM);
  const t_profile = useTranslations(MESSAGE_FILES.PROFILE);

  const handleDeleteAccount = async () => {
    if (!currentUser?.email) {
      toast.error(t(mapServerError('')));
      return;
    }

    setIsLoading(true);

    try {
      const result = await requestDeleteAccount(currentUser.email, locale);

      router.push(
        `/${locale}/${REDIRECT_PATHS.verifyDeleteAccount}?email=${encodeURIComponent(result.email || currentUser.email)}`,
      );
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
    <div className="space-y-4">
      <p className="text-lg leading-[21px] laptop:text-xl font-normal laptop:leading-6 tracking-normal text-red-400">
        {t_profile('delete_account_confirm_title')}
      </p>
      <p className="text-sm leading-[21px] laptop:text-base font-normal laptop:leading-6 tracking-normal text-slate-400 dark:text-slate-200">
        {t_profile('delete_account_confirm_text')}
      </p>
      <div className="flex gap-2">
        <div className="w-1/2">
          <Button size={'primary'} variant="outline" onClick={setActiveForm} disabled={isLoading}>
            {t('cancel')}
          </Button>
        </div>
        <div className="w-1/2">
          <Button
            size={'primary'}
            className="w-full bg-red-800 hover:bg-red-900"
            disabled={isLoading}
            onClick={handleDeleteAccount}
          >
            {t('delete_account')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProfileAlert;
