'use server';

import { IRequestOrder } from '@/shared/types/order-interface';
import {
  ICancelBody,
  IconfirmBookRes,
  IConfirmOrderBody,
  IPdfRes,
  ISmsValidateOrder,
} from '@/shared/types/order.actions.type';

const BASE_URL = 'https://greenbus-backend.onrender.com/api/v1';

export const createOrder = async (body: IRequestOrder) => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const res = await response.json();
    console.log(res);
    return { status: 'error' };
  }

  const res = await response.json();
  return res;
};

export const smsValidateOrder = async (body: ISmsValidateOrder) => {
  const response = await fetch(`${BASE_URL}/orders/sms-validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return { status: 'error' };
  }

  const res = await response.json();
  return res;
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
    throw new Error('Error');
  }
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

    console.log(data);
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
    throw new Error('Не удалось получить билет');
  }

  const data = await response.json();
  return data;
}
