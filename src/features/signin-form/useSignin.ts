import { signin } from '@/shared/api/auth.service';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { REDIRECT_PATHS } from '@/shared/configs/redirectPaths';
import { mapServerError } from '@/shared/errors/mapServerError';
import { useRouter } from '@/shared/i18n/routing';
import { useUserStore } from '@/shared/store/useUser';
import { signinSchema } from '@/shared/validation/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

export const useSignin = () => {
  const t = useTranslations(MESSAGE_FILES.FORM);

  const locale = useLocale();
  const router = useRouter();

  const [errorSignin, setErrorSignin] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUserStore } = useUserStore();

  const [isViewPassword, setIsViewPassword] = useState(false);

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: z.infer<typeof signinSchema>) => {
    setIsLoading(true);
    setErrorSignin(null);
    try {
      const result = await signin({ email: data.email, password: data.password }, locale);

      const { message, currentUser, error } = result;

      if (!!error) {
        setErrorSignin(t(`${mapServerError(error.message)}`));
        setIsViewPassword(false);
        setIsLoading(false);
        form.reset({ email: data.email, password: '' });
        return;
      }

      if (message === '2FA code sent') {
        router.push(`/${REDIRECT_PATHS.verify2FA}/${result.email}`, { scroll: true });
        setIsViewPassword(false);
        setIsLoading(false);
        return;
      }

      if (message === 'Verification code sent') {
        router.push(`/${REDIRECT_PATHS.verifyEmail}/${result.email}`, { scroll: true });
        setIsViewPassword(false);
        setIsLoading(false);
        return;
      }

      if (message === 'Successfully signin') {
        setUserStore(currentUser);
        router.replace(`/${REDIRECT_PATHS.profile}`);
        return;
      }

      setErrorSignin(t('error_occurred'));
    } catch (e) {
      const msg = e instanceof Error ? e.message : '';
      setErrorSignin(t(mapServerError(msg)));
    } finally {
      setIsViewPassword(false);
      form.reset({ email: data.email, password: '' });
    }
  };

  return { errorSignin, isLoading, onSubmit, form, isViewPassword, setIsViewPassword };
};
