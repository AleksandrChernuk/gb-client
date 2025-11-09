function getTotalPriceFromPassengers(passengers: Passenger[]): number {
  const total = passengers.reduce((sum, passenger) => {
    const basePrice = Math.floor(passenger.price);

    if (!Number.isFinite(basePrice) || basePrice <= 0) {
      return sum;
    }

    const discountStr = passenger.discountPercent?.trim();
    const discount = discountStr ? parseFloat(discountStr) : 0;

    const isValidDiscount = discount > 0 && discount <= 100;
    const finalPrice = isValidDiscount ? basePrice * (1 - discount / 100) : basePrice;

    return sum + Math.floor(finalPrice);
  }, 0);

  // Округляем до 2 знаков после запятой
  return Math.round(total * 100) / 100;
}

export default getTotalPriceFromPassengers;
