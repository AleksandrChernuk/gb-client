import { IFreeSeats } from './free.seats.interface';

export interface ConfirmPaymentInterface {
  provider_id: string;
  order_id: string;
  hash?: string;
  locale: string;
  is_send_ticket?: boolean;
}

interface IAlertMessage {
  description: string;
}

export interface INewOrderResponse {
  amount: string;
  currency: string;
  providerId: string;
  providerOrderId: string;
  myOrderId: string;
  description: string;
  locale: string;
  customerEmail: string;
  freeSeats?: IFreeSeats[];
  status?: string;
  message?: string;
  alertMessage: IAlertMessage;
}
