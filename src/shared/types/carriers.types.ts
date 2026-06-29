export type TCarrierStatus = string;
export type TCarrierBaggagePolicyStatus = string;
export type TCarrierRefundPolicyStatus = string;
export type TCarrierDiscountType = string;
export type TCarrierDiscountScope = string;
export type TCarrierManualRouteStatus = string;

export interface ICarrierNameTranslation {
  language: string;
  carrierName: string;
}

export interface ICarrierDescriptionTranslation {
  language: string;
  carrierDescription: string;
}

export interface ICarrierAddressTranslation {
  language: string;
  carrierAddress: string;
}

export interface ICarrierCurrency {
  currencyCode: string;
}

export interface ICarrierSimpleResponse {
  id: string;
  slug: string;
  logo: string | null;
  legalIdentifier: string | null;
  status: TCarrierStatus;
  ratingAverage: string;
  name: ICarrierNameTranslation | null;
  address: ICarrierAddressTranslation | null;
  updatedAt: Date;
  createdAt: Date;
}

export interface ICarriersQueryResponse {
  data: ICarrierSimpleResponse[];
  totalCarriers: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface IQueryCarriersOptions {
  language?: string;
  query?: string;
  status?: TCarrierStatus;
  page?: number;
  perPage?: number;
}

export interface ICarrierBus {
  id: number;
  name: string;
}

export interface ICarrierBaggageRuleTranslation {
  language: string;
  rule: string;
}

export interface ICarrierBaggagePolicy {
  id: number;
  status: TCarrierBaggagePolicyStatus;
  rule: ICarrierBaggageRuleTranslation | null;
}

export interface ICarrierRefundRuleDescription {
  language: string;
  rule: string;
}

export interface ICarrierRefundPolicyTier {
  hoursBeforeDeparture: number;
  refundPercentage: number;
  description: ICarrierRefundRuleDescription | null;
}

export interface ICarrierRefundPolicy {
  id: number;
  status: TCarrierRefundPolicyStatus;
  tiers: ICarrierRefundPolicyTier[];
}

export interface ICarrierDiscountTitle {
  language: string;
  discountTitle: string;
}

export interface ICarrierDiscountDescription {
  language: string;
  discountDescription: string;
}

export interface ICarrierDiscount {
  id: number;
  type: TCarrierDiscountType;
  value: string;
  currencyCode: string | null;
  title: ICarrierDiscountTitle | null;
  description: ICarrierDiscountDescription | null;
  code: string | null;
  maxUses: number | null;
  usedCount: number;
  startsAt: Date | null;
  expiresAt: Date | null;
  isActive: boolean;
  scope: TCarrierDiscountScope;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICarrierRouteName {
  language: string;
  routeName: string;
}

export interface ICarrierRoute {
  id: string;
  number: string | null;
  name: ICarrierRouteName | null;
  departureLocationId: number;
  arrivalLocationId: number;
  currencyCode: string;
  defaultAllowCardPayment: boolean;
  defaultAllowBoardingPayment: boolean;
  isTransfer: boolean;
  eTicket: boolean;
  busId: number | null;
  insurerId: string | null;
  salesCutoffMinutes: number;
  status: TCarrierManualRouteStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICarrierByIdResponse {
  id: string;
  slug: string;
  name: ICarrierNameTranslation | null;
  description: ICarrierDescriptionTranslation | null;
  address: ICarrierAddressTranslation | null;
  phones: string[];
  logo: string | null;
  legalIdentifier: string | null;
  currencies: ICarrierCurrency[];
  defaultCurrencyCode: string;
  defaultAllowCardPayment: boolean;
  defaultAllowBoardingPayment: boolean;
  status: TCarrierStatus;
  ratingAverage: string;
  buses: ICarrierBus[];
  baggageRules: ICarrierBaggagePolicy[];
  refundPolicies: ICarrierRefundPolicy[];
  discounts: ICarrierDiscount[];
  routes: ICarrierRoute[];
  updatedAt: Date;
  createdAt: Date;
}

export type ICarriers = ICarrierSimpleResponse;
