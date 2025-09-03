import { IUserOrdersResponse, IUserPaymentsResponse } from '@/types/payments.Info.types';

type GetUserRequestsData = {
  userId: string;
  locale: string;
  page?: number;
  perPage?: number;
};

// ================ Метод получения Customer и Payments =================
export async function getUserCustomerAndPayments(data: GetUserRequestsData): Promise<IUserPaymentsResponse> {
  const { userId, locale, page, perPage } = data;

  // query параметры для пагинации
  const queryParams = new URLSearchParams();

  if (page !== undefined) {
    queryParams.append('page', page.toString());
  }

  if (perPage !== undefined) {
    queryParams.append('perPage', perPage.toString());
  }

  const queryString = queryParams.toString();
  const url = `/api/user/payments/${userId}${queryString ? `?${queryString}` : ''}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept-Language': locale,
    },
    credentials: 'include',
  });

  let payload: unknown;

  try {
    payload = await res.json();
  } catch {
    throw new Error('Invalid JSON from server');
  }

  if (!res.ok) {
    const msg = (payload as { message?: string })?.message ?? 'Failed to fetch user payments';
    throw new Error(msg);
  }

  return payload as IUserPaymentsResponse;
}

// ================= Мнтод получения ордеров Юзера ===================
export async function getUserOrders(data: GetUserRequestsData): Promise<IUserOrdersResponse> {
  const { userId, locale, page, perPage } = data;
  console.log('userId', userId);
  console.log('locale', locale);
  console.log('page', page);
  console.log('perPage', perPage);

  // query параметры для пагинации
  const queryParams = new URLSearchParams();

  if (page !== undefined) {
    queryParams.append('page', page.toString());
  }

  if (perPage !== undefined) {
    queryParams.append('perPage', perPage.toString());
  }

  const queryString = queryParams.toString();
  const url = `/api/user/orders/${userId}${queryString ? `?${queryString}` : ''}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept-Language': locale,
    },
    credentials: 'include',
  });

  let payload: unknown;

  try {
    payload = await res.json();
  } catch {
    throw new Error('Invalid JSON from server');
  }

  if (!res.ok) {
    const msg = (payload as { message?: string })?.message ?? 'Failed to fetch user orders';
    throw new Error(msg);
  }

  return payload as IUserOrdersResponse;
}
