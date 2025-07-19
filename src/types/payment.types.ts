import { IFreeSeats } from './free.seats.interface';

export interface ConfirmPaymentInterface {
  providerId: string;
  orderId: string;
  hash?: string;
  locale: string;
  isSendTicket?: boolean;
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
  error?: string;
  detal: string;
  locale: string;
  customerEmail: string;
  freeSeats?: IFreeSeats[];
  status?: string;
  message?: string;
  alertMessage: IAlertMessage;
}
