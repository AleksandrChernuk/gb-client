export type IOrderBody = {
  amount: number;
  currency: string;
  providerId: string;
  providerOrderId: string;
  myOrderId: string;
  description: string;
  locale: string;
  customerEmail: string;
};

const BASE_URL = 'https://greenbus-backend.onrender.com/api/v1';

export async function liqpayInitiate(body: IOrderBody) {
  try {
    const response = await fetch(`${BASE_URL}/liqpay/initiate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('liqpay failed');
    }
    const data = await response.json();
    return data as { data: string; signature: string };
  } catch (error) {
    throw error;
  }
}
