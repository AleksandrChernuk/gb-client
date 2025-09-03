'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUser';
import { logout } from '@/actions/auth.service';

const ConfirmDeleteAccountPage = () => {
  const router = useRouter();
  const { clearUserStore } = useUserStore();

  useEffect(() => {
    // Очищаем store и выполняем logout
    const cleanupAndRedirect = async () => {
      clearUserStore();
      await logout();

      // Редирект на главную через 5 секунд
      const timer = setTimeout(() => {
        router.push('/');
      }, 10000);

      return () => clearTimeout(timer);
    };

    cleanupAndRedirect();
  }, [clearUserStore, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-body-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-gray-300 p-8 rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-900 mb-4">Аккаунт деактивирован</h2>

            <div className="space-y-4 text-gray-800">
              <p>Ваш аккаунт успешно деактивирован и будет полностью удален через 7 дней.</p>

              <p className="text-sm">Спасибо за использование нашего сервиса!</p>
            </div>

            <div className="mt-8 space-y-3">
              <Link
                href="/"
                className="block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700  transition-colors"
              >
                Вернуться на главную
              </Link>

              <p className="text-xs text-gray-700">Вы будете автоматически перенаправлены через 10 секунд</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteAccountPage;
