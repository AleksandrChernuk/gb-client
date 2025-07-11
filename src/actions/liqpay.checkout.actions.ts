import { IRequestOrder } from '@/types/order-interface';

export type IOrderBody = {
  order: IRequestOrder;
  result_url: string;
  locale: string;
};

export async function checkout(body: IOrderBody) {
  try {
    const response = await fetch(`/api/mono`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Checkout failed');
    }
    const data = await response.json();
    return data as { data: string; signature: string };
  } catch (error) {
    throw error;
  }
}
