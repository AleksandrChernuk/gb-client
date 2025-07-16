'use server';

import { ConfirmPaymentInterface } from '@/types/payment.types';
import { IRequestOrder } from '@/types/order-interface';

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

interface ICancelBody {
  providerId: string;
}

export const cancelOrder = async (body: ICancelBody, myOrderId: string) => {
  const response = await fetch(`${BASE_URL}/orders/cancel/${myOrderId}}`, {
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

export const confirmBooking = async (body: ConfirmPaymentInterface) => {
  try {
    const response = await fetch(`${BASE_URL}/confirm_booking`, {
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

export async function getOrderStatusAndPdf(orderId: string) {
  const response = await fetch(`${BASE_URL}/orders/pdf/${orderId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Не удалось получить билет');
  }

  const data = await response.json();
  // { status: 'success', pdf: '...', orderNumber: '...' }
  return data;
}
