import { Passenger } from '../types';

export function getTotalPriceFromPassengers(passengers: Passenger[]): number {
  const total = passengers.reduce((sum, passenger) => {
    const basePrice = Math.floor(passenger.price);

    if (!Number.isFinite(basePrice) || basePrice <= 0) {
      return sum;
    }

    const discountRaw = passenger.discountPercent?.trim();
    const discount = discountRaw ? parseFloat(discountRaw) : NaN;

    let finalPrice = basePrice;

    if (!isNaN(discount) && discount > 0 && discount <= 100) {
      finalPrice = basePrice * (1 - discount / 100);
    }

    return sum + finalPrice;
  }, 0);

  return Math.round(total * 100) / 100;
}

export function getPriceFromPassenger(passenger: Passenger): number {
  const basePrice = Math.floor(passenger.price);

  if (!Number.isFinite(basePrice) || basePrice <= 0) {
    return 0;
  }

  const discountRaw = passenger.discountPercent?.trim();
  const discount = discountRaw ? parseFloat(discountRaw) : NaN;

  let finalPrice = basePrice;

  if (!isNaN(discount) && discount > 0 && discount <= 100) {
    finalPrice = basePrice * (1 - discount / 100);
  }

  return Math.floor(finalPrice);
}
