'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useLocale } from 'next-intl';
import { useUserStore } from '@/store/useUser';
import { REDIRECT_PATHS } from '@/config/redirectPaths';
import { confirmDeleteAccount } from '@/actions/auth.service';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import ResendCode from '@/components/modules/auth/ResendCode';

export default function VerifyDeleteAccountPage() {
  const locale = useLocale();
  const router = useRouter();
  const { currentUser, clearUserStore } = useUserStore();
  const param = useSearchParams();
  const email = param.get('email') || currentUser?.email || '';

  const [totp, setTotp] = useState('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const mapServerError = (msg: string): string => {
    switch (msg) {
      case 'Verification token expired':
        return 'Код подтверждения истек. Запросите новый код.';
      case 'Invalid reset token':
        return 'Неверный код подтверждения';
      case 'Account deactivated':
        return 'Аккаунт уже деактивирован';
      case 'User not found':
        return 'Пользователь не найден';
      default:
        return 'Произошла ошибка. Попробуйте позже.';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Проверка кода
    if (!/^\d{6}$/.test(totp)) {
      setError('Введите 6-значный код');
      return;
    }

    if (!email) {
      setError('Email не указан');
      return;
    }

    setIsLoading(true);

    try {
      await confirmDeleteAccount({ code: totp, email }, locale);

      // Очищаем store перед редиректом
      clearUserStore();

      // Переходим на страницу подтверждения удаления
      router.replace(REDIRECT_PATHS.confirmDeleteAccount);
    } catch (err) {
      if (err instanceof Error) {
        setError(mapServerError(err.message));
      } else {
        setError('Произошла ошибка. Попробуйте еще раз.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-body-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">Подтверждение удаления аккаунта</h2>
        </div>

        {/* Предупреждение */}
        <div className="flex flex-col">
          <h3 className="text-sm font-medium text-foreground">Внимание! Это действие необратимо</h3>
          <div className="mt-2 text-sm text-foreground">
            <p>После подтверждения ваш аккаунт будет деактивирован и полностью удален через 7 дней.</p>
          </div>
          <p className="mt-8 text-center text-sm text-gray-500">Введите 6-значный код, отправленный на вашу почту</p>
        </div>

        <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Код (6 цифр) */}
            <div>
              <Label htmlFor="totp" className="sr-only">
                Код подтверждения
              </Label>
              <div className="w-full flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={totp}
                  onChange={(value) => setTotp(value.replace(/\D+/g, ''))}
                  disabled={isLoading}
                  className="w-full"
                >
                  <InputOTPGroup className="w-full">
                    <InputOTPSlot index={0} className="w-16 h-16" />
                    <InputOTPSlot index={1} className="w-16 h-16" />
                    <InputOTPSlot index={2} className="w-16 h-16" />
                    <InputOTPSlot index={3} className="w-16 h-16" />
                    <InputOTPSlot index={4} className="w-16 h-16" />
                    <InputOTPSlot index={5} className="w-16 h-16" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Button
              type="submit"
              disabled={isLoading || !/^\d{6}$/.test(totp)}
              className="w-full bg-red-600 hover:bg-red-700 focus:ring-red-500"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <span>Удаление...</span>
                </div>
              ) : (
                'Удалить'
              )}
            </Button>

            <Link
              href="/profile/settings"
              className="block w-full text-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Отменить
            </Link>
          </div>
        </form>

        {email && <ResendCode email={email} locale={locale} type="DELETE_ACCOUNT" className="mt-6" />}

        <div className="text-center">
          <Link href="/" className="text-sm text-blue-600 hover:text-blue-500 transition-colors">
            На главную страницу
          </Link>
        </div>
      </div>
    </div>
  );
}
