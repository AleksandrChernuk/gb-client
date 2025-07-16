'use server';

import { IRequestOrder } from '@/types/order-interface';
interface ICancelBody {
  providerId: string;
}

interface IConfirmOrderBody {
  myOrderId: string;
}

export interface IconfirmBookRes {
  status: string;
  message: string;
  orderId: string;
}

export interface IPdfRes {
  status: string;
  message: string;
  orderNumber: string;
  pdf: string;
}

const BASE_URL = 'https://greenbus-backend.onrender.com/api/v1';

export const createOrder = async (body: IRequestOrder) => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData);
    throw new Error('Error');
  }

  const data = await response.json();
  return data;
};

export const cancelOrder = async (body: ICancelBody, myOrderId: string) => {
  const response = await fetch(`${BASE_URL}/orders/cancel/${myOrderId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const res = await response.json();
    console.log(res);

    throw new Error('Error');
  }
  const res = await response.json();
  console.log(res);
  return null;
};

export const confirmBook = async (body: IConfirmOrderBody): Promise<IconfirmBookRes | null> => {
  try {
    const response = await fetch(`${BASE_URL}/orders/confirm_book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching route details:', error);
    return null;
  }
};

export async function getOrderStatusAndPdf(orderId: string): Promise<IPdfRes | null> {
  const response = await fetch(`${BASE_URL}/orders/pdf/${orderId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const res = await response.json();
    console.log(res);

    throw new Error('Не удалось получить билет');
  }

  const data = await response.json();
  return data;
}
