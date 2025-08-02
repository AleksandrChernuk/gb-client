import { Passenger } from '../types';

export function getTotalPriceFromPassengers(passengers: Passenger[]): number {
  const total = passengers.reduce((sum, passenger) => {
    const basePrice = Math.floor(passenger.price);
    if (!Number.isFinite(basePrice) || basePrice <= 0) {
      return sum;
    }

    const discountRaw = passenger.discountPercent?.trim();
    const discount = discountRaw ? parseFloat(discountRaw) : NaN;

    const finalPrice =
      !isNaN(discount) && discount > 0 && discount <= 100 ? basePrice * (1 - discount / 100) : basePrice;

    return sum + Math.floor(finalPrice);
  }, 0);

  return Math.round(total * 100) / 100;
}
