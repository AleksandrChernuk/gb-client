export interface ICancelBody {
  providerId: string;
  providerOrderId: string;
}

export interface IConfirmOrderBody {
  providerId: string;
  providerOrderId: string;
  myOrderId: string;
  customerPhone: string;
  customerEmail: string;
  locale: string;
}

export interface IconfirmBookRes {
  status: string;
  message: string;
  orderId: string;
}

export interface IPdfRes {
  status: string;
  message: string;
  orderNumber: string;
  orderLink: string;
  ticketLinks: string[];
  pdf: string;
}

export interface ISmsValidateOrder {
  providerId: string;
  providerOrderId: string;
  customerPhone: string;
  validationCode: string;
  locale: string;
  myOrderId: string;
}
