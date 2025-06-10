export interface ConfirmPaymentInterface {
  provider_id: string;
  order_id: string;
  hash?: string;
  locale: string;
  is_send_ticket?: boolean;
}
