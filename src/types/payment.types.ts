export interface ConfirmPaymentInterface {
  provider_id: string;
  order_id: string;
  hash?: string;
  locale: string;
  is_send_ticket?: boolean;
}

export interface InitiatePaymentInterface {
  amount: number;
  currency: string;
  providerId: string;
  orderId: string;
  description: string;
  locale: string;
  customerEmail: string;
}
