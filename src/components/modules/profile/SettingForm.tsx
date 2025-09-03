'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useUserStore } from '@/store/useUser';
import { logout, requestChangePassword, requestDeleteAccount, updateUser } from '@/actions/auth.service';
import { REDIRECT_PATHS } from '@/config/redirectPaths';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type UpdateFormType = 'name' | 'email' | '2fa' | 'delete' | null;

export default function SettingForm() {
  const locale = useLocale();
  const router = useRouter();
  const { currentUser, setUserStore, clearUserStore } = useUserStore();

  // Общие состояния
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);
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
      setIsLoading(false);
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

    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  // ================ Переключение 2FA ================
  const handleToggle2FA = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  // ================ Смена пароля ================
  const handleChangePassword = async () => {
    setError('');
    setIsLoading(true);

    if (!currentUser?.email) {
      setError('Не удалось получить данные пользователя');
      setIsLoading(false);
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
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // ================ Удаление аккаунта ==================
  const handleDeleteAccount = async () => {
    if (!currentUser?.email) {
      setError('Не удалось получить email пользователя');
      return;
    }

    setError('');
    setIsLoading(true);

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
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-150 mx-auto p-6 space-y-6">
      <div className="p-4 bg-body-bg rounded-md space-y-2">
        <p>
          <strong>Имя:</strong> {currentUser.userName}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <p>
          <strong>2FA:</strong> {currentUser.twoFA ? 'Включена' : 'Отключена'}
        </p>
      </div>

      {/* Кнопки действий или формы */}
      {activeForm === null ? (
        <div className="space-y-4">
          <Button className="w-full" onClick={() => setActiveForm('name')} disabled={isLoading}>
            Сменить имя
          </Button>

          <Button className="w-full" onClick={handleToggle2FA} disabled={isLoading || currentUser.method === 'GOOGLE'}>
            {isLoading ? 'Обновление...' : `${currentUser.twoFA ? 'Отключить' : 'Включить'} 2FA`}
          </Button>

          <Button
            className="w-full"
            onClick={() => setActiveForm('email')}
            disabled={isLoading || currentUser.method === 'GOOGLE'}
          >
            Сменить email
          </Button>

          <Button
            className="w-full"
            onClick={handleChangePassword}
            disabled={isLoading || !currentUser?.email || currentUser.method === 'GOOGLE'}
          >
            {isLoading ? 'Отправка...' : 'Сменить пароль'}
          </Button>

          <Button
            className="w-full bg-red-800 hover:bg-red-900"
            onClick={() => setActiveForm('delete')}
            disabled={isLoading}
          >
            Удалить аккаунт
          </Button>
        </div>
      ) : (
        <>
          {/* Форма смены имени */}
          {activeForm === 'name' && (
            <div className="space-y-4">
              <Label htmlFor="userName">Новое имя</Label>
              <Input
                id="userName"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Введите новое имя"
                disabled={isLoading}
              />
              <div className="flex space-x-2">
                <Button variant="outline" onClick={resetForm} disabled={isLoading} className="flex-1">
                  Отмена
                </Button>
                <Button onClick={handleUpdateName} disabled={isLoading} className="flex-1">
                  {isLoading ? 'Сохранение...' : 'Сохранить'}
                </Button>
              </div>
            </div>
          )}

          {/* Форма смены email */}
          {activeForm === 'email' && (
            <div className="space-y-4">
              <p>На новую почту будет отправлен код подтверждения</p>
              <Label htmlFor="newEmail">Новая почта</Label>
              <Input
                id="newEmail"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Введите новую почту"
                disabled={isLoading}
              />

              {currentUser.method === 'CREDENTIALS' && (
                <>
                  <Label htmlFor="currentPassword">Текущий пароль</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Введите текущий пароль"
                    disabled={isLoading}
                  />
                </>
              )}

              <div className="flex space-x-2">
                <Button variant="outline" onClick={resetForm} disabled={isLoading} className="flex-1">
                  Отмена
                </Button>
                <Button onClick={handleUpdateEmail} disabled={isLoading} className="flex-1">
                  {isLoading ? 'Отправка...' : 'Отправить код'}
                </Button>
              </div>
            </div>
          )}

          {/* Форма удаления */}
          {activeForm === 'delete' && (
            <div className="space-y-5 p-4 rounded-md bg-body-bg">
              <p className="text-xl text-red-500 font-medium">Вы уверены, что хотите удалить аккаунт?</p>
              <p className="text-sm text-foreground">
                Это действие необратимо. Ваш аккаунт будет деактивирован немедленно и полностью удален через 7 дней.
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1" onClick={resetForm} disabled={isLoading}>
                  Отмена
                </Button>
                <Button
                  className="flex-1 bg-red-700 hover:bg-red-800"
                  onClick={handleDeleteAccount}
                  disabled={isLoading}
                >
                  {isLoading ? 'Отправка...' : 'Удалить'}
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
