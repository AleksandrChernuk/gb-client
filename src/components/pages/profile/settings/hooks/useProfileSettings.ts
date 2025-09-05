import { logout, requestChangePassword, requestDeleteAccount, updateUser } from '@/actions/auth.service';
import { REDIRECT_PATHS } from '@/config/redirectPaths';
import { useRouter } from '@/i18n/routing';
import { useUserStore } from '@/store/useUser';
import { useLocale } from 'next-intl';
import { useState } from 'react';

type UpdateFormType = 'name' | 'email' | '2fa' | 'delete' | null;

export const useProfileSettings = () => {
  const locale = useLocale();
  const router = useRouter();
  const { currentUser, setUserStore, clearUserStore } = useUserStore();
  // Общие состояния
  const [isLoadingUpdateName, setIsLoadingUpdateName] = useState(false);
  const [isLoadingUpdateEmail, setIsLoadingUpdateEmail] = useState(false);
  const [isLoadingToggle2FA, setIsLoadingToggle2FA] = useState(false);
  const [isLoadingChangePassword, setIsLoadingChangePassword] = useState(false);
  const [isLoadingDeleteAccount, setIsLoadingDeleteAccount] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [success, setSuccess] = useState<string>('');
  const [activeForm, setActiveForm] = useState<UpdateFormType>(null);

  // Состояния форм
  const [userName, setUserName] = useState(currentUser?.userName || '');
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const mapServerError = (msg: string): string => {
    switch (msg) {
      case 'Account deactivated':
        return 'Аккаунт деактивирован';
      case 'OAuth password not settable':
        return 'Изменение пароля недоступно для аккаунтов Google';
      case 'OAuth email change not allowed':
        return 'Изменение email недоступно для аккаунтов Google';
      case 'Authentication required':
        return 'Необходима авторизация';
      case 'Email already exists':
        return 'Пользователь с такой почтой уже существует';
      case 'Current password required':
        return 'Введите текущий пароль';
      case 'Invalid current password':
        return 'Неверный текущий пароль';
      default:
        return 'Произошла ошибка. Попробуйте позже.';
    }
  };

  const resetForm = () => {
    setActiveForm(null);
    setError('');
    setSuccess('');
    setNewEmail('');
    setCurrentPassword('');
    setUserName(currentUser?.userName || '');
  };

  // ================ Смена имени ================
  const handleUpdateName = async () => {
    if (!userName.trim() || userName === currentUser?.userName) {
      setError('Введите новое имя');
      return;
    }

    setIsLoadingUpdateName(true);
    setError('');

    try {
      const result = await updateUser({ userName: userName.trim() }, locale);

      if (result.user) {
        // Обновляем пользователя в store
        setUserStore({ ...currentUser!, userName: result.user.userName });
      }

      setSuccess('Имя успешно изменено');
      setTimeout(() => resetForm(), 2000);
    } catch (error) {
      if (error instanceof Error) {
        setError(mapServerError(error.message));
      } else {
        setError('Произошла ошибка. Попробуйте позже.');
      }
    } finally {
      setIsLoadingUpdateName(false);
    }
  };

  // ================ Смена email ================
  const handleUpdateEmail = async () => {
    if (!newEmail.trim()) {
      setError('Введите новую почту');
      return;
    }

    if (!currentPassword && currentUser?.method === 'CREDENTIALS') {
      setError('Введите текущий пароль');
      return;
    }

    setIsLoadingUpdateEmail(true);
    setError('');

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updateData: any = { newEmail: newEmail.trim() };
      if (currentUser?.method === 'CREDENTIALS') {
        updateData.currentPassword = currentPassword;
      }

      await updateUser(updateData, locale);

      // Очищаем store
      clearUserStore();

      logout();

      // Редирект на верификацию
      router.push(`${REDIRECT_PATHS.verifyEmail}/${encodeURIComponent(newEmail)}`);
    } catch (error) {
      if (error instanceof Error) {
        setError(mapServerError(error.message));
      } else {
        setError('Произошла ошибка. Попробуйте позже.');
      }
    } finally {
      setIsLoadingUpdateEmail(false);
    }
  };

  // ================ Переключение 2FA ================
  const handleToggle2FA = async () => {
    setIsLoadingToggle2FA(true);
    setError('');

    try {
      const newTwoFA = !currentUser?.twoFA;
      await updateUser({ twoFA: newTwoFA }, locale);

      // Очищаем store
      clearUserStore();

      logout();

      router.push(REDIRECT_PATHS.signin);
    } catch (error) {
      if (error instanceof Error) {
        setError(mapServerError(error.message));
      } else {
        setError('Произошла ошибка. Попробуйте позже.');
      }
    } finally {
      setIsLoadingToggle2FA(false);
    }
  };

  // ================ Смена пароля ================
  const handleChangePassword = async () => {
    setError('');
    setIsLoadingChangePassword(true);

    if (!currentUser?.email) {
      setError('Не удалось получить данные пользователя');
      setIsLoadingChangePassword(false);
      return;
    }

    try {
      const result = await requestChangePassword(locale, currentUser.email);

      if (result.email) {
        router.replace(`${REDIRECT_PATHS.changePassword}?email=${result.email}`);
      } else {
        router.replace(`${REDIRECT_PATHS.changePassword}?email=${currentUser.email}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(mapServerError(error.message));
      } else {
        setError('Произошла ошибка. Попробуйте позже.');
      }
    } finally {
      setIsLoadingChangePassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!currentUser?.email) {
      setError('Не удалось получить email пользователя');
      return;
    }

    setError('');
    setIsLoadingDeleteAccount(true);

    try {
      const result = await requestDeleteAccount(currentUser.email, locale);

      router.push(
        `${REDIRECT_PATHS.verifyDeleteAccount}?email=${encodeURIComponent(result.email || currentUser.email)}`,
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(mapServerError(error.message));
      } else {
        setError('Произошла ошибка при запросе удаления аккаунта');
      }
    } finally {
      setIsLoadingDeleteAccount(false);
    }
  };

  return {
    handleChangePassword,
    handleDeleteAccount,
    handleToggle2FA,
    handleUpdateEmail,
    handleUpdateName,
    activeForm,
    isLoadingUpdateName,
    isLoadingUpdateEmail,
    isLoadingToggle2FA,
    isLoadingChangePassword,
    isLoadingDeleteAccount,
  };
};
