/* eslint-disable @typescript-eslint/no-explicit-any */
import { PassengerFormData } from '@/features/checkout-form/types/passenger.form.types';
import { ProviderConfig } from '@/shared/types/checkot.types';

function createEmptyPassenger(config: ProviderConfig, price: number): PassengerFormData {
  const passenger: Record<string, any> = {};

  for (const field of config.required) {
    if (config.fields[field]) {
      passenger[field] = '';
    }
  }

  passenger.price = Math.round(price);
  passenger.discountId = '';
  passenger.discountDescription = '';
  passenger.discountPercent = '';

  return passenger as PassengerFormData;
}

export function createPassengers(voyagers: number, providerConfig: ProviderConfig, price: number): PassengerFormData[] {
  return Array.from({ length: voyagers }, () => {
    return createEmptyPassenger(providerConfig, price);
  });
}

export default createEmptyPassenger;
