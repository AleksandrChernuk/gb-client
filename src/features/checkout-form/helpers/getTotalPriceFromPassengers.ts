import { PassengerFormData } from '@/features/checkout-form/types/passenger.form.types';

function getTotalPriceFromPassengers(passengers: PassengerFormData[]): number {
  const total = passengers.reduce((sum, passenger) => {
    const basePrice = passenger.price;

    if (!Number.isFinite(basePrice) || basePrice <= 0) {
      return sum;
    }

    const discountStr = passenger.discountPercent?.trim();
    const discount = discountStr ? parseFloat(discountStr) : 0;
    const isValidDiscount = discount > 0 && discount <= 100;
    const finalTicketPrice = isValidDiscount ? basePrice * (1 - discount / 100) : basePrice;

    const baggageTotal = Array.isArray(passenger.paidBaggage)
      ? passenger.paidBaggage.reduce((acc, b) => {
          const baggagePrice = Number(b.price);
          return Number.isFinite(baggagePrice) && baggagePrice > 0 ? acc + baggagePrice : acc;
        }, 0)
      : 0;

    return sum + finalTicketPrice + baggageTotal;
  }, 0);

  // Округляем до 2 знаков после запятой
  return Math.round(total * 100) / 100;
}

export default getTotalPriceFromPassengers;
