'use client';

import { getUserCustomerAndPayments } from '@/actions/user.services.client';
import { Link } from '@/i18n/routing';
import { useUserStore } from '@/store/useUser';
import { IUserPaymentsResponse } from '@/types/payments.Info.types';
import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';

export default function PaymentsInfoClientComponent() {
  const user = useUserStore((state) => state.currentUser);
  const locale = useLocale();

  const { data, isLoading, error } = useQuery<IUserPaymentsResponse>({
    queryKey: ['payments', user?.id, locale],
    queryFn: async () => {
      const response = await getUserCustomerAndPayments({ userId: user!.id, locale, page: 1, perPage: 10 });
      return response;
    },
  });
  console.log(user);

  if (!data) return null;

  if (isLoading) {
    return (
      <div className="p-4 flex flex-col items-center">
        <Link href="/profile" className="mb-5 py-2 px-6 border rounded-lg">
          Назад в профиль
        </Link>
        <div className="w-full max-w-2xl animate-pulse">Загрузка…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 flex flex-col items-center">
        <Link href="/profile" className="mb-5 py-2 px-6 border rounded-lg">
          Назад в профиль
        </Link>
        <div className="w-full max-w-2xl text-red-600">Ошибка: {error.message}</div>
      </div>
    );
  }

  const { customer, payments } = data.data;

  return (
    <div className="p-4 flex flex-col items-center">
      <Link href="/profile" className="mb-5 py-2 px-6 border rounded-lg">
        Назад в профиль
      </Link>

      <h1 className="text-2xl">Данные о плательщике и платежах</h1>
      <h2 className="text-lg">(только оплаченные по карте)</h2>

      <div className="mt-4 space-y-2">
        <strong className="text-xl">Статистика:</strong>
        <p>Всего ордеров: {data.pagination.total}</p>
        <p>Текущая страница: {data.pagination.page}</p>
        <p>Кол-во ордеров на странице: {data.pagination.perPage}</p>
        <p>Всего страниц: {data.pagination.totalPages}</p>
      </div>

      <div className="mt-5 w-full max-w-2xl">
        <h2 className="text-xl">Плательщик:</h2>
        <ul className="mt-3 space-y-1">
          <li>Имя: {customer.firstName ?? '—'}</li>
          <li>Фамилия: {customer.lastName ?? '—'}</li>
          {customer.middleName && <li>Отчество: {customer.middleName}</li>}
          {customer.birthdate && <li>Дата рождения: {customer.birthdate}</li>}
          <li>Электронная почта: {customer.email ?? '—'}</li>
          <li>Номер телефона: {customer.phone ?? '—'}</li>
        </ul>
      </div>

      <div className="mt-5 w-full max-w-2xl">
        <h2 className="text-xl">Платежи:</h2>
        <ul className="mt-3 space-y-4">
          {payments.map((p) => (
            <li key={p.paymentId} className="pb-4 border-b">
              <p>Сумма: {p.paymentAmount}</p>
              <p>Валюта: {p.currency}</p>
              <p>Провайдер: {p.paymentProvider}</p>
              <p>Дата платежа: {p.updatedAt.split('T')[0]}</p>
              <p>Ордер № {p.myOrderNumber?.padStart(9, '0')}</p>
              <p>
                Маршрут: {p.fromCityName}, {p.fromCountry} — {p.toCityName}, {p.toCountry}
              </p>
              <p>Дата отправления: {p.departureDateTime.split(' ')[0]}</p>
              <p>Время отправления: {p.departureDateTime.split(' ')[1]}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
