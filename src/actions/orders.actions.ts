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
