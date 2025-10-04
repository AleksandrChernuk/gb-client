/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProviderConfig } from '@/shared/types/checkot.types';
import { PassengerFormData } from '@/features/checkout-form/types';

export function createEmptyPassenger(config: ProviderConfig, isChildren = false, price: number): PassengerFormData {
  const passenger: Record<string, any> = {};

  for (const field of config.required) {
    if (config.fields[field]) {
      passenger[field] = '';
    }
  }

  passenger.isChildren = isChildren;
  passenger.price = Math.round(price);
  passenger.discountId = '';
  passenger.discountDescription = '';
  passenger.discountPercent = '';

  return passenger as PassengerFormData;
}

export function createPassengers(
  adultCount: number,
  childCount: number,
  providerConfig: ProviderConfig,
  price: number,
): PassengerFormData[] {
  const totalCount = adultCount + childCount;

  return Array.from({ length: totalCount }, (_, index) => {
    const isChild = index >= adultCount;
    return createEmptyPassenger(providerConfig, isChild, price);
  });
}
