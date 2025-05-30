export interface IDiscount {
  id: string | null;
  name: string | null;
  description: string | null;
  percent: number | null;
  priceWithDiscount?: number | null;
  category: string | null;
}
