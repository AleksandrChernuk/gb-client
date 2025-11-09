import { IFreeSeats } from './free.seats.interface';

export interface ConfirmPaymentInterface {
  providerId: string;
  orderId: string;
  hash?: string;
  locale: string;
  isSendTicket?: boolean;
}

interface IAlertMessage {
  title: string;
  subtitle: string;
  description: string;
}

export interface INewOrderResponse {
  amount: string;
  currency: string;
  providerId: string;
  providerOrderId: string;
  myOrderNumber: number;
  myOrderId: string;
  customerPhone?: string;
  detal: string;
  locale: string;
  customerEmail: string;
  freeSeats?: IFreeSeats[];
  status?: string;
  message?: string;
  alertMessage: IAlertMessage;
}

export interface IOtpVerifySend {
  status: string;
  message: string;
}
