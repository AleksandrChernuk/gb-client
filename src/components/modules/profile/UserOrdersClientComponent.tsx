'use client';

import { getUserOrders } from '@/actions/user.services.client';
import { Link } from '@/i18n/routing';
import { useUserStore } from '@/store/useUser';
import { IUserOrdersResponse } from '@/types/payments.Info.types';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

const UserOrdersClientComponent = () => {
  const user = useUserStore((state) => state.currentUser);
  const locale = useLocale();

  const [data, setData] = useState<IUserOrdersResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserOrders = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const requestData = {
          userId: user?.id || '',
          locale,
          page: 1,
          perPage: 10,
        };

        const response = await getUserOrders(requestData);

        if (response.data.length > 0) {
          console.log('First Order:', response.data[0]);
          console.log('First Order Tickets:', response.data[0].tickets);
        }

        setData(response);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user orders';
        console.error('Error fetching user orders:', errorMessage);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserOrders();
  }, [locale, user]);

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
        <div className="w-full max-w-2xl text-red-600">Ошибка: {error}</div>
      </div>
    );
  }

  return (
    <>
      {data && (
        <div className="p-4 flex flex-col items-center">
          <Link href="/profile" className="mb-5 py-2 px-6 border rounded-lg">
            Назад в профиль
          </Link>

          <h1 className="text-2xl">Ваши Ордера</h1>

          <div className="mt-4 space-y-2">
            <strong className="text-xl">Статистика:</strong>
            <p>Всего ордеров: {data.pagination.total}</p>
            <p>Текущая страница: {data.pagination.page}</p>
            <p>Кол-во ордеров на странице: {data.pagination.perPage}</p>
            <p>Всего страниц: {data.pagination.totalPages}</p>
          </div>

          <ul className="mt-3 space-y-4">
            {data.data.map((order) => (
              <li key={order.orderId} className="pb-4 border-b">
                <strong>{`Ордер № ${order.orderNumber?.padStart(9, '0')}`}</strong>
                <p>
                  <strong>Маршрут:</strong> {order.fromCityName} - {order.toCityName}
                </p>
                <p>
                  <strong>Отправление:</strong> {order.departureDateTime}
                </p>
                <p>
                  <strong>Стоимость:</strong> {order.totalPrice} {order.currency}
                </p>
                <p>
                  <strong>Кол-во билетов:</strong> {order.tickets.length}
                </p>
                <p>
                  <strong>Тип ордера:</strong> {order.orderType}
                </p>
                <p>
                  <strong>Тип поездки:</strong> {order.tripType}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data && data.data.length === 0 && <p>Ордера не найдены.</p>}
    </>
  );
};

export default UserOrdersClientComponent;
