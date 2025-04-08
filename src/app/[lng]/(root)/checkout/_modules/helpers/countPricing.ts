type TCountPricing = {
  price: number | null | undefined;
  passengers: number;
};

export const countPricing = ({ price, passengers }: TCountPricing) => {
  if (!price) {
    return 0;
  }
  return price * passengers;
};
