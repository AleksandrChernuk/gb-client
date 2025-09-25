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

// {
//   amount: '959.5',
//   currency: 'UAH',
//   providerId: 'cm529qela0000ufewld93ysyu',
//   providerOrderId: 'd9fe5afe-3649-4d9c-9dc1-3988dd6d2b81',
//   myOrderId: 'd9fe5afe-3649-4d9c-9dc1-3988dd6d2b81',
//   locale: 'uk',
//   customerPhone: '+380639425964',
//   customerEmail: 'check64@ukr.net'
// }

export interface INewOrderResponse {
  amount: string;
  currency: string;
  providerId: string;
  providerOrderId: string;
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
